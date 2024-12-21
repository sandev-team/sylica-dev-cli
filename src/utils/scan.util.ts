import fs from 'fs';

export type TFile = {
  name: string;
  isDirectory: boolean;
}

export const scanFiles = (path: string): TFile[] => {
  const files = fs.readdirSync(path);
  const fileDetails = files.map(file => {
    const isDirectory = fs.statSync(`${path}/${file}`).isDirectory();
    return { name: file, isDirectory };
  });
  return fileDetails;
};
