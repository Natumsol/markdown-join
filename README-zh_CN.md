[English Version](./README.md)

# markdown-join （中文版）

[![npm version](https://img.shields.io/npm/v/markdown-join.svg?style=flat-square)](https://npmjs.com/package/markdown-join)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

一个支持自定义 include/partial/set/var 指令的 Markdown 合并 CLI 与库，适用于文档模块化、知识库、静态站点生成等场景。

---

## 功能特性

- **CLI & API**：可命令行或库方式调用
- **自定义指令**：支持 `include`、`partial`、`set`、`var` 灵活拼装内容
- **循环检测**：防止无限递归
- **TypeScript 支持**

## 安装

```bash
npm install -g markdown-join # 全局 CLI
# 或
npm install markdown-join    # 项目依赖
```

## 用法

### CLI

```bash
markdown-join <input.md> [-o output.md]
# 或
mdj <input.md> [-o output.md]
```

- `<input.md>`：输入 Markdown 文件
- `-o, --output <output.md>`：输出文件（可选，默认输出到 stdout）

#### 示例

```bash
markdown-join docs/index.md -o dist/README.md
```

### API

```ts
import { joinMarkdown } from 'markdown-join';

const result = joinMarkdown('docs/index.md');
console.log(result);
```

## 指令说明

- `<!-- mdj:include file="path.md" -->` — 引入其他 Markdown 文件
- `<!-- mdj:partial file="path.md" -->` — include 的别名
- `<!-- mdj:set var="foo" value="bar" -->` — 设置变量
- `<!-- mdj:var name="foo" -->` — 插入变量

## 贡献

欢迎 PR 和 issue！如有重大改动建议先提 issue 讨论。

1. Fork 本仓库
2. 创建分支 (`git checkout -b feature/foo`)
3. 提交更改 (`git commit -am 'Add foo'`)
4. 推送分支 (`git push origin feature/foo`)
5. 创建 Pull Request

## 许可证

MIT © natumsol 