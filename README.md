[中文说明](./README-zh_CN.md)

# markdown-join

[![npm version](https://img.shields.io/npm/v/markdown-join.svg?style=flat-square)](https://npmjs.com/package/markdown-join)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A CLI and library for joining Markdown files with custom include/partial/set/var directives. Useful for modular documentation, knowledge bases, and static site generation.

---

## Features

- **CLI & API**: Use as a command-line tool or import as a library
- **Custom Directives**: Supports `include`, `partial`, `set`, and `var` for flexible content composition
- **Circular Include Detection**: Prevents infinite loops
- **TypeScript Support**

## Installation

```bash
npm install -g markdown-join # global CLI
# or
npm install markdown-join    # as a project dependency
```

## Usage

### CLI

```bash
markdown-join <input.md> [-o output.md]
# or
mdj <input.md> [-o output.md]
```

- `<input.md>`: Input Markdown file
- `-o, --output <output.md>`: Output file (optional, defaults to stdout)

#### Example

```bash
markdown-join docs/index.md -o dist/README.md
```

### API

```ts
import { joinMarkdown } from 'markdown-join';

const result = joinMarkdown('docs/index.md');
console.log(result);
```

## Directives

- `<!-- mdj:include file="path.md" -->` — Include another Markdown file
- `<!-- mdj:partial file="path.md" -->` — Alias for include
- `<!-- mdj:set var="foo" value="bar" -->` — Set a variable
- `<!-- mdj:var name="foo" -->` — Insert a variable

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss major changes first.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/foo`)
3. Commit your changes (`git commit -am 'Add foo'`)
4. Push to the branch (`git push origin feature/foo`)
5. Open a pull request

## License

MIT © natumsol
