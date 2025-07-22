#!/usr/bin/env node
import { joinMarkdown } from './processor';
import fs from 'fs';
import { Command } from 'commander';

const program = new Command();
program
  .name('markdown-join')
  .description('Join Markdown files with custom directives')
  .argument('<input>', 'Input Markdown file')
  .option('-o, --output <output>', 'Output Markdown file')
  .action((input, options) => {
    try {
      const result = joinMarkdown(input);
      if (options.output) {
        fs.writeFileSync(options.output, result, 'utf8');
      } else {
        process.stdout.write(result);
      }
    } catch (e: any) {
      console.error('Error:', e.message);
      process.exit(1);
    }
  });

program.parse(process.argv); 