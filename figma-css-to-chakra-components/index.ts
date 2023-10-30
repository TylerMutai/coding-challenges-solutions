import {Configuration, OpenAIApi} from "openai";
import * as fs from "fs";

const promptFile = "./prompt.md";
const cssFile = "./code.css";
const responseFile = "./response";

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

function writePromptResponse(filePath: string, result: string) {
  fs.writeFileSync(filePath, result, {flag: 'a'});
}

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

async function getGPTResponse(text: string): Promise<string> {
  let resultString = "";
  const response = await openai.createChatCompletion(
    {
      model: "gpt-4",
      messages: [
        {
          "role": "system",
          "content": text
        }
      ],
      max_tokens: 4096,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
  console.log("RESPONSE: ", response);
  if (response.data?.choices?.length > 0) {
    const gptRes = response.data.choices[0].message?.content;
    if (gptRes) {
      resultString = gptRes;
    }
  }
  return resultString;
}

async function processGPT(prompt: string, index: number): Promise<void> {
  const res = await getGPTResponse(prompt);
  console.log("GPT-4 RESPONSE: ", res);
  console.log("##############################");
  console.log("\n");
  writePromptResponse(`${responseFile}_${index}.md`, res);
}

async function gpt4Function(): Promise<void> {
  const prompt = readFile(promptFile);
  const css = readFile(cssFile);

  // Split the CSS into individual blocks
  const cssBlocks = css.split("\n\n\n\n");
  // Iterate over blocks
  for (let i = 0; i < cssBlocks.length; i++) {
    const block = cssBlocks[i];
    if (block.length) {
      // Buffer is flushed when next block would breach the limit
      const promptWithCSS = prompt.replace(/#-#-#/gi, block);

      console.log("CURRENT BLOCK: ", block);
      console.log("##############################");
      console.log("PROMPT WITH CSS: ", promptWithCSS);
      console.log("\n");
      processGPT(promptWithCSS, i).then();
    }
  }
}

gpt4Function();