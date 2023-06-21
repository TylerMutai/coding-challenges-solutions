import * as fs from 'fs';
import * as readline from 'readline';
import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
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
          "content": text
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

// Function that attempts to infer the most optimal overLapLength that we should use to maintain
// context.
async function getProcessedChunk(chunk: string, overlapLength: number): Promise<string> {
  const processedChunk = await gpt4Function(chunk);

  if (overlapLength === 0) {
    return processedChunk;
  }

  const overlap = processedChunk.slice(-overlapLength);
  const lastSentenceEndIndex = Math.max(overlap.lastIndexOf('.'), overlap.lastIndexOf('!'), overlap.lastIndexOf('?'));

  if (lastSentenceEndIndex !== -1) {
    // Add 1 to include the punctuation mark
    return processedChunk.slice(0, -overlapLength + lastSentenceEndIndex + 1);
  } else {
    return processedChunk.slice(0, -overlapLength);
  }
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
  let bufferLength = 0;

  for await (const line of readInterface) {
    buffer += ' ' + line;
    bufferLength += buffer.length
    result = ""

    while (buffer.length >= chunkLength) {
      let chunk = buffer.slice(0, chunkLength);
      buffer = buffer.slice(chunkLength - overlapLength);

      let processedChunk = await getProcessedChunk(chunk, isFirstChunk ? 0 : overlapLength);
      result += processedChunk;
      isFirstChunk = false;
    }

    fs.writeFileSync(outputFile, result, {flag: 'a'});
    console.log(`Chunk finished processing. Current buffer length:${buffer.length}. Original buffer length: ${buffer.length} `)
    console.log(`Text written to file: ${result}`)
  }

  if (buffer.length > 0) {
    let lastProcessedChunk = await getProcessedChunk(buffer, 0);
    result += lastProcessedChunk;
  }

  fs.writeFileSync(outputFile, result, {flag: 'a'});
  console.log("Last chunk finished processing.")
  console.log(`Text written to file: ${result}`)
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