#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';

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

program.parse(process.argv);
