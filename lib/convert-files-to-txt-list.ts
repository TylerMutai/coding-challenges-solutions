import * as fs from 'fs';
import * as path from 'path';

// Function to recursively copy files from the source directory to the target directory
const allowedExtensions = new Set<string>([
  ".csv",
  ".docx",
  ".doc",
  ".enex",
  ".eml",
  ".epub",
  ".html",
  ".md",
  ".msg",
  ".odt",
  ".pdf",
  ".pptx",
  ".ppt",
  ".txt",
]);

const extensionsToConvertToTxt = new Set<string>([
  "dart"
]);

function copyFilesRecursively(source: string, target: string): void {
  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    console.log("Source destination is defined as: ", source);
    console.log("Target destination is defined as: ", target);

    if (fs.statSync(sourcePath).isDirectory()) {
      if (!fs.existsSync(targetPath)) {
        console.log("Creating directory now at: ", targetPath)
        fs.mkdirSync(targetPath);
      }
      copyFilesRecursively(sourcePath, targetPath);
    } else {
      console.log("Handling file: ", file)
      const extension = path.extname(sourcePath);
      if (extensionsToConvertToTxt.has(extension)) {

        // if file has extension that is in  [extensionsToConvertToTxt], rename it
        console.log(`Renaming file extension from '${extension}' to '.txt`)
        fs.copyFileSync(
          sourcePath,
          path.join(target, path.basename(file, path.extname(file)) + '.txt')
        );
      } else {
        // if the file extension is part of allowed extensions, copy the file.
        if (allowedExtensions.has(extension)) {
          console.log("Copying file from: ", sourcePath , " to", targetPath)
          fs.copyFileSync(sourcePath, targetPath);
        }
      }
    }
  });

  console.log("File copying complete.")
}

function main() {
  const sourceDirectory = process.argv[2];
  const targetDirectory = process.argv[3];

  if (!fs.existsSync(sourceDirectory)) {
    console.log(`Source directory: ${sourceDirectory} does not exist.`);
    return;
  }

  if (!fs.existsSync(targetDirectory)) {
    console.log(`Target directory: ${targetDirectory} does not exist. Creating it now...`);
    fs.mkdirSync(targetDirectory);
  }

  copyFilesRecursively(sourceDirectory, targetDirectory);
}

main();