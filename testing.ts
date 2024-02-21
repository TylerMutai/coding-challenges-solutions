import * as fs from 'fs';
import * as path from 'path';

async function processFilesRecursively(source: string) {
  const files = fs.readdirSync(source);

  let count = 1;
  for (const file of files) {
    const sourcePath = path.join(source, file);
    if (fs.statSync(sourcePath).isDirectory()) {
       await processFilesRecursively(sourcePath);
       return;
    }

    console.log("Source destination is defined as: ", sourcePath);
    console.log("Handling file: ", sourcePath);

    // if file has extension that is in  [extensionsToProcess], read the whole file.
    const content = fs.readFileSync(sourcePath, 'utf8');

    fs.writeFileSync("./content.txt", `// ${count}. ${file}: \n` + content + "\n```\n\n", {
      flag: "a+",
    });

    console.log("File processing complete.");
    count++;
  }
}

function main() {
  const sourceDirectory = process.argv[2];

  if (!fs.existsSync(sourceDirectory)) {
    console.error(`Source directory: ${sourceDirectory} does not exist.`);
    return;
  }

  processFilesRecursively(sourceDirectory).then(() => {
    console.log("Exiting.......");
  });
}

main();