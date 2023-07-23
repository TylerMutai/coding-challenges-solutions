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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const zip_a_folder_1 = require("zip-a-folder");
const util_1 = require("util");
// Set up Promisified functions
const readdirAsync = (0, util_1.promisify)(fs.readdir);
const readFileAsync = (0, util_1.promisify)(fs.readFile);
const writeFileAsync = (0, util_1.promisify)(fs.writeFile);
const INPUT_DIR = './dart_sources'; // Your Dart source code directory
const CHUNK_SIZE = 5000; // The size of the input chunks in characters
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the list of Dart files in the directory
        const files = (yield readdirAsync(INPUT_DIR)).filter((filename) => path.extname(filename) === '.dart');
        let allCode = '';
        // Read every Dart file and append the content to the 'allCode' variable
        for (const file of files) {
            const filePath = path.join(INPUT_DIR, file);
            const content = yield readFileAsync(filePath, 'utf8');
            allCode += content;
        }
        // If a ZIP file is required, create a zip from INPUT_DIR
        const zipName = 'dart_sources.zip';
        yield (0, zip_a_folder_1.zip)(INPUT_DIR, zipName);
        console.log(`Created ${zipName}`);
        // Function call to process the Dart code
        analyzeAndGenerateFiles(allCode).then(() => {
            console.log("Finished creating output file.");
        });
    });
}
function analyzeAndGenerateFiles(dartCode) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield writeFileAsync(outputFilename, outputContent, 'utf8');
        console.log(`Generated ${outputFilename}`);
    });
}
main().catch((error) => console.error(error));
