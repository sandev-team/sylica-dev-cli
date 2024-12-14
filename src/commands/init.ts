import inquirer from 'inquirer';
import ps from 'picocolors';
// import fs from 'fs';
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
  
  console.log(answers);
};
