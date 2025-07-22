import { joinMarkdown } from '../src/processor';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import test from 'node:test';
import assert from 'node:assert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testDir = path.join(__dirname, '__testdata__');
if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);

function write(file: string, content: string) {
  fs.writeFileSync(path.join(testDir, file), content, 'utf8');
}

test.describe('markdown-join functionality tests', () => {
  test.it('basic include directive', () => {
    write('a.md', '# A\n\n<!-- mdj:include file="b.md" -->\n');
    write('b.md', 'B content');
    assert.strictEqual(
      joinMarkdown(path.join(testDir, 'a.md')).trim(),
      '# A\n\nB content'
    );
  });

  test.it('partial directive', () => {
    write('c.md', 'C head\n<!-- mdj:partial file="d.md" -->');
    write('d.md', 'D body');
    assert.strictEqual(
      joinMarkdown(path.join(testDir, 'c.md')).trim(),
      'C head\nD body'
    );
  });

  test.it('set/var directive', () => {
    write('e.md', '<!-- mdj:set var="foo" value="bar" -->\nHello <!-- mdj:var name="foo" -->');
    assert.strictEqual(
      joinMarkdown(path.join(testDir, 'e.md')).trim(),
      'Hello bar'
    );
  });

  test.it('circular include detection', () => {
    write('loop1.md', '1 <!-- mdj:include file="loop2.md" -->');
    write('loop2.md', '2 <!-- mdj:include file="loop1.md" -->');
    let loopErr = false;
    try {
      joinMarkdown(path.join(testDir, 'loop1.md'));
    } catch (e: any) {
      loopErr = /Circular include/.test(e.message);
    }
    assert(loopErr, 'Should detect circular include');
  });
}); 