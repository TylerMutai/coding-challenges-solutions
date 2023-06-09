import * as fs from 'fs';
import * as path from 'path';
import {zip,} from 'zip-a-folder';
import {promisify} from 'util';

// Set up Promisified functions
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const INPUT_DIR = './dart_sources'; // Your Dart source code directory
const CHUNK_SIZE = 5000; // The size of the input chunks in characters

async function main() {
  // Get the list of Dart files in the directory
  const files = (await readdirAsync(INPUT_DIR)).filter(
    (filename) => path.extname(filename) === '.dart'
  );

  let allCode = '';

  // Read every Dart file and append the content to the 'allCode' variable
  for (const file of files) {
    const filePath = path.join(INPUT_DIR, file);
    const content = await readFileAsync(filePath, 'utf8');
    allCode += content;
  }

  // If a ZIP file is required, create a zip from INPUT_DIR
  const zipName = 'dart_sources.zip';
  await zip(INPUT_DIR, zipName);
  console.log(`Created ${zipName}`);

  // Function call to process the Dart code
  analyzeAndGenerateFiles(allCode).then(() => {
    console.log("Finished creating output file.")
  });
}

async function analyzeAndGenerateFiles(dartCode: string) {
  let index = 0;
  const length = dartCode.length;

  // Process code chunks
  while (index < length) {
    const chunk = dartCode.slice(index, index + CHUNK_SIZE); // Get the chunk
    index += CHUNK_SIZE;

    // ... Pass the chunk to the AI model and process the results
  }

  // ... Create the output file based on the AI analysis
  const outputFilename = 'output.txt';
  const outputContent = 'Generated content...';
  await writeFileAsync(outputFilename, outputContent, 'utf8');
  console.log(`Generated ${outputFilename}`);
}

main().catch((error) => console.error(error));