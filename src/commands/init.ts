import inquirer from 'inquirer';
import ps from 'picocolors';
import fs from 'fs';
import { scanFiles } from '../utils/scan.util';
import { execSync } from 'child_process';
// import path from 'path';

export const initCommand = async () => {
  console.log(ps.green('Initializing a new project...'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the name of your project:',
    },
  ]);

  // // execute the command
  // const command = `npx create-react-app ${answers.projectName}`;
  // const result = execSync(command);
  // console.log(result);

  // log the current directory
  console.log(process.cwd());
  // scan files in the current directory
  const files = scanFiles('.');
  console.log(files);

  console.log(answers);
};
