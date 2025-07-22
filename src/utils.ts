// markdown-join utils
export function parseAttrs(attrStr: string): Record<string, string> {
  const ATTR_REGEX = /(\w+)="([^"]*)"/g;
  const attrs: Record<string, string> = {};
  let match;
  while ((match = ATTR_REGEX.exec(attrStr))) {
    attrs[match[1]] = match[2];
  }
  return attrs;
} 