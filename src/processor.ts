// markdown-join processor
import fs from 'fs';
import path from 'path';

export interface JoinOptions {
  variables?: Record<string, string>;
  rootDir?: string;
  stack?: string[];
}

const MDJ_REGEX = /<!--\s*mdj:(\w+)([^>]*)-->/g;
const ATTR_REGEX = /(\w+)="([^"]*)"/g;

function parseAttrs(attrStr: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  let match;
  while ((match = ATTR_REGEX.exec(attrStr))) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

export function joinMarkdown(filePath: string, options: JoinOptions = {}): string {
  const { variables = {}, rootDir = path.dirname(filePath), stack = [] } = options;
  const absPath = path.isAbsolute(filePath) ? filePath : path.join(rootDir, filePath);
  if (stack.includes(absPath)) {
    throw new Error(`Circular include detected: ${[...stack, absPath].join(' -> ')}`);
  }
  if (!fs.existsSync(absPath)) {
    throw new Error(`File not found: ${absPath}`);
  }
  let content = fs.readFileSync(absPath, 'utf8');
  let localVars = { ...variables };
  content = content.replace(MDJ_REGEX, (full, cmd, attrStr) => {
    const attrs = parseAttrs(attrStr);
    switch (cmd) {
      case 'include':
      case 'partial': {
        if (!attrs.file) throw new Error(`Missing file attr in ${full}`);
        return joinMarkdown(attrs.file, { variables: localVars, rootDir, stack: [...stack, absPath] });
      }
      case 'set': {
        if (!attrs.var || attrs.value === undefined) throw new Error(`Missing var/value in ${full}`);
        localVars[attrs.var] = attrs.value;
        return '';
      }
      case 'var': {
        if (!attrs.name) throw new Error(`Missing name in ${full}`);
        return localVars[attrs.name] ?? '';
      }
      default:
        return full;
    }
  });
  return content;
} 