import {getSimilarityIndex} from "./text-similarity-index";
// Create the file in the output folder
import path from "path";
import fs from "fs";

const {workerData} = require("worker_threads");

const {link, outputFolder, textContent, overallContent} = workerData;

const similarityIndex = getSimilarityIndex(overallContent, textContent);
console.info(`Processing link: [${link}]. Similarity index: ${similarityIndex}`);

const fileName = link.replace(/[^a-zA-Z0-9]/g, "_") + ".txt";
const filePath = path.join(outputFolder, fileName);
fs.writeFileSync(filePath, textContent);