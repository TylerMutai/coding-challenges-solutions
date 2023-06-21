import * as fs from 'fs';
import * as readline from 'readline';
import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

async function gpt4Function(text: string): Promise<string> {
  let resultString = "";
  const response = await openai.createChatCompletion(
    {
      model: "gpt-4",
      messages: [
        {
          "role": "system",
          "content": "You are an AI model, the smartest model that currently exists. Answer as accurately as possible"
        },
        {
          "role": "user",
          "content":  text
        }
      ],
      max_tokens: 2048,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
  if (response.data?.choices?.length > 0) {
    const gptRes = response.data.choices[0].message?.content;
    if (gptRes) {
      resultString = gptRes;
    }
  }
  return resultString;
}

// Function to read and process text file using sliding window technique
async function processTextFile(filePath: string, chunkLength: number, overlapLength: number): Promise<void> {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false
  });

  let buffer = '';
  let result = '';
  let isFirstChunk = true;
  const outputFile = filePath.replace('.txt', '_new.txt');

  for await (const line of readInterface) {
    buffer += ' ' + line;

    while (buffer.length >= chunkLength) {
      let chunk = buffer.slice(0, chunkLength);
      buffer = buffer.slice(chunkLength - overlapLength);

      let processedChunk = await gpt4Function(chunk);
      if (isFirstChunk) {
        result += processedChunk;
        isFirstChunk = false;
      } else {
        result += processedChunk.slice(overlapLength);
      }
    }

    fs.writeFileSync(outputFile, result, {flag: 'w'});
  }

  if (buffer.length > 0) {
    let lastProcessedChunk = await gpt4Function(buffer);
    result += lastProcessedChunk.slice(overlapLength);
  }

  fs.writeFileSync(outputFile, result, {flag: 'w'});
}

// Usage example
const filePath = '/Users/brianbaliach/Desktop/doc.txt';
const chunkLength = 5000;
const overlapLength = 25;
processTextFile(filePath, chunkLength, overlapLength).then(() => {
  console.log('Processing complete and output file saved.');
}).catch((error) => {
  console.error('Error in processing text file:', error.response?.data || error.message);
});