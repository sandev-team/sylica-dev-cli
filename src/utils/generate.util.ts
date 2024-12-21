import path from "path";
import { TFile, scanFiles } from "./scan.util";
import fs from "fs";

export type TReplace = {
  name: string;
  value: string;
}

export type TReplaceFile = {
  fileOutPath: string;
  replace: TReplace[];
}

function safeExecute(callback: () => void) {
    try {
        callback(); // Attempt to execute the callback function
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('An error occurred:', error.message); // Handle the error
        } else {
            console.error('An unknown error occurred:', error); // Handle non-Error types
        }
    }
}

export const generateFiles = (files: TFile[], replaceFiles: TReplaceFile[], templateDir: string, outputDir: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // heap map replaceFiles
      const fileOutPaths = replaceFiles.map(replaceFile => replaceFile.fileOutPath);
      files.forEach((file) => {
        if (file.isDirectory) {
          const subDir = path.join(outputDir, file.name);
          const subTemplateDir = path.join(templateDir, file.name);
          fs.mkdirSync(subDir, { recursive: true });
          generateFiles(scanFiles(subTemplateDir), replaceFiles, subTemplateDir, subDir);
        } else {
          const templateFile = path.join(templateDir, file.name);
          const outputFile = path.join(outputDir, file.name.replace('.hbs', ''));

          if (fileOutPaths.includes(outputFile)) {
            // find replace file
            const indexOfReplaceFile = fileOutPaths.indexOf(outputFile);
            // replace content
            const templateContent = fs.readFileSync(templateFile, 'utf8');
            const content = replaceFiles[indexOfReplaceFile].replace.reduce((tempContent, replace) => {
              return tempContent.replace(replace.name, replace.value);
            }, templateContent);
            // pop fileOutPaths
            fileOutPaths.splice(indexOfReplaceFile, 1);
            // write file
            fs.writeFileSync(outputFile, content);
          } else {
            fs.copyFileSync(templateFile, outputFile);
          }
        }
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
