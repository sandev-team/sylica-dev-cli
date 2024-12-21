import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { pkgOrganize } from '@/config/generate.config'
import { scanFiles, TFile } from '../../../utils/scan.util'
import ps from 'picocolors'
import { generateFiles, TReplaceFile } from '../../../utils/generate.util'
import inquirer from 'inquirer'
import ora from 'ora'

// Get the current directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) // Derive __dirname from __filename

export const generatePkgCommand = async (name: string) => {
  // get the template directory
  const templateDir = path.join(
    __dirname,
    // '../../../',
    'templates',
    'vite-react'
  )

  // check if the template directory exists
  if (!fs.existsSync(templateDir)) {
    console.error(ps.red(`Template directory ${templateDir} does not exist`))
    return
  }

  // prepare the output directory
  const outputDir = path.join(process.cwd(), name)

  // check if the output directory exists
  if (fs.existsSync(outputDir)) {
    console.error(ps.red(`Output directory ${outputDir} already exists`))
    // ask user to replace the directory
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'replace',
        message: 'Do you want to replace the directory?',
      },
    ])
    if (!answer.replace) {
      return
    }
  } else {
    // create the output directory
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // input the package manager name option npm or pnpm
  const pkgManager = await inquirer.prompt([
    {
      type: 'list',
      name: 'pkgManager',
      message: 'Select the package manager',
      choices: ['npm', 'pnpm', 'yarn'],
    },
  ])

  // check if the output directory exists
  if (!fs.existsSync(outputDir)) {
    console.error(ps.red(`Output directory ${outputDir} does not exist`))
    return
  }

  const pkgName = `${pkgOrganize}/${name}`

  // config the replace
  const pkgReplace: TReplaceFile[] = [
    {
      fileOutPath: path.join(outputDir, 'package.json'),
      replace: [
        {
          name: '__NAME__',
          value: pkgName,
        },
      ],
    },
    {
      fileOutPath: path.join(outputDir, 'vite.config.ts'),
      replace: [
        {
          name: '__NAME__',
          value: pkgName,
        },
      ],
    },
  ]

  try {
    // get the template files
    const templateFiles = scanFiles(templateDir)
    // generate the files
    await generateFiles(templateFiles, pkgReplace, templateDir, outputDir)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(ps.red(`Error generating files: ${error.message}`))
    } else {
      console.error(ps.red(`Error generating files: ${error}`))
    }
  }

  const spinner = ora('Installing dependencies...')
  spinner.start()
  // install the dependencies
  const cmd = await import('execa')
  await cmd.execa(pkgManager.pkgManager, ['install'], { cwd: outputDir })
  spinner.succeed('Dependencies installed successfully')
}
