import * as fs from 'fs';
import * as path from 'path';
import {OpenAI} from "openai";

const extensionsToProcess = new Set<string>([
  ".ts",
]);

const openAiTool = new OpenAI();

function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

async function processFilesRecursively(source: string, target: string, assistantId: string) {
  const files = fs.readdirSync(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const extension = path.extname(file);
    const targetPath = path.join(target, `${path.basename(file, extension)}.test${extension}`);

    console.log("Source destination is defined as: ", sourcePath);
    console.log("Target destination is defined as: ", targetPath);

    if (fs.statSync(sourcePath).isDirectory()) {
      if (!fs.existsSync(targetPath)) {
        console.log("Creating directory now at: ", targetPath);
        fs.mkdirSync(targetPath);
      }
      await processFilesRecursively(sourcePath, targetPath, assistantId);
    } else {
      console.log("Handling file: ", sourcePath);
      if (extensionsToProcess.has(extension)) {

        // if file has extension that is in  [extensionsToProcess], read the whole file.
        const content = fs.readFileSync(sourcePath, 'utf8');

        // make request to our apollo server assistant model to generate tests.
        const aiThread = await openAiTool.beta.threads.create({
          messages: [
            {
              role: "user",
              content: "```typescript" + extension.includes("x") ? " jsx\n" : "\n" + content + "\n```",
            },
          ],
        });

        console.log("Created thread with id: ", aiThread.id);
        console.log("Executing run....");
        const aiRun = await openAiTool.beta.threads.runs.create(aiThread.id, {
          assistant_id: assistantId,
        });

        while (true) {
          const apiRunObj = await openAiTool.beta.threads.runs.retrieve(aiThread.id, aiRun.id);
          console.log("Checking run status. Current status: ", apiRunObj.status);

          if (apiRunObj.status === "completed") {
            try {
              console.log("Run status is complete. Getting message and storing to file..... ");
              const messages = await openAiTool.beta.threads.messages.list(aiThread.id);
              const aiResponse = messages.getPaginatedItems().filter(m => m.role === "assistant");
              const messageStrings = [];
              for (const m of aiResponse) {
                const _messages = m.content.filter(c => c.type === "text").map(c => (c as any).text.value);
                messageStrings.push(..._messages);
              }
              console.log("The AI responded with: ", messageStrings);
              fs.writeFileSync(targetPath, messageStrings.join("\n"), {
                flag: "a+",
              });
              console.log("Successfully written contents to file: ", targetPath);
            } catch (e) {
              console.error("Could not write contents to file: ", targetPath);
              console.error("The error was: ", e);
            }
            break;
          }

          console.log("Sleeping for 5 seconds before checking server again.");
          await sleep(5000);
        }
      } else {
        console.log("The file: ", targetPath, " is currently not supported");
      }
    }
  }

  console.log("File processing complete.");
}

function main() {
  const assistantId = process.argv[2];
  const sourceDirectory = process.argv[3];
  const targetDirectory = process.argv[4];

  if (!fs.existsSync(sourceDirectory)) {
    console.error(`Source directory: ${sourceDirectory} does not exist.`);
    return;
  }

  if (!fs.existsSync(targetDirectory)) {
    console.info(`Target directory: ${targetDirectory} does not exist. Creating it now...`);
    fs.mkdirSync(targetDirectory);
  }

  processFilesRecursively(sourceDirectory, targetDirectory, assistantId).then(() => {
    console.log("Exiting.......");
  });
}

main();