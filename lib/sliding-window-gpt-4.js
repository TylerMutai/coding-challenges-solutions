"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: "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",
});
const openai = new openai_1.OpenAIApi(configuration);
function gpt4Function(text) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let resultString = "";
        const response = yield openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    "role": "system",
                    "content": "You are an AI model, the smartest model that currently exists. Answer as accurately as possible"
                },
                {
                    "role": "user",
                    "content": "Given this text: \n" + text + " \n I'd like you to remove any punctuation and grammatical errors and also remove any forms of plagiarism"
                }
            ],
            max_tokens: 2048,
            temperature: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        if (((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.choices) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            const gptRes = (_c = response.data.choices[0].message) === null || _c === void 0 ? void 0 : _c.content;
            if (gptRes) {
                resultString = gptRes;
            }
        }
        return resultString;
    });
}
// Function to read and process text file using sliding window technique
function processTextFile(filePath, chunkLength, overlapLength) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const readInterface = readline.createInterface({
            input: fs.createReadStream(filePath),
            output: process.stdout,
            terminal: false
        });
        let buffer = '';
        let result = '';
        let isFirstChunk = true;
        const outputFile = filePath.replace('.txt', '_new.txt');
        try {
            for (var _d = true, readInterface_1 = __asyncValues(readInterface), readInterface_1_1; readInterface_1_1 = yield readInterface_1.next(), _a = readInterface_1_1.done, !_a;) {
                _c = readInterface_1_1.value;
                _d = false;
                try {
                    const line = _c;
                    buffer += ' ' + line;
                    while (buffer.length >= chunkLength) {
                        let chunk = buffer.slice(0, chunkLength);
                        buffer = buffer.slice(chunkLength - overlapLength);
                        let processedChunk = yield gpt4Function(chunk);
                        if (isFirstChunk) {
                            result += processedChunk;
                            isFirstChunk = false;
                        }
                        else {
                            result += processedChunk.slice(overlapLength);
                        }
                    }
                    fs.writeFileSync(outputFile, result, { flag: 'w' });
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = readInterface_1.return)) yield _b.call(readInterface_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (buffer.length > 0) {
            let lastProcessedChunk = yield gpt4Function(buffer);
            result += lastProcessedChunk.slice(overlapLength);
        }
        fs.writeFileSync(outputFile, result, { flag: 'w' });
    });
}
// Usage example
const filePath = '/Users/brianbaliach/Desktop/doc.txt';
const chunkLength = 5000;
const overlapLength = 25;
processTextFile(filePath, chunkLength, overlapLength).then(() => {
    console.log('Processing complete and output file saved.');
}).catch((error) => {
    var _a;
    console.error('Error in processing text file:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
});
