#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init';
import { generatePkgCommand } from './commands/generate/pkg';

const program = new Command();
const name = 'sylica-dev';

program
  .name(name)
  .description('A CLI for scaffolding projects')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a new project')
  .action(initCommand);

program
  .command('generate')
  .alias('g')
  .description('Generate a code template')
  .command('package')
  .alias('pkg')
  .description('Generate a package template')
  .argument('<name>', 'The name of the project to generate')
  .description('Generate a new project')
  .action(generatePkgCommand);

program.parse(process.argv);
