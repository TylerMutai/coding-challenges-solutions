const textSimilarity = require(__dirname + "/text-similarity-index");
const path = require("path");
const fs = require("fs");
const { workerData } = require("worker_threads");
const { link, outputFolder, textContent, overallContent } = workerData;
const similarityIndex = textSimilarity.getSimilarityIndex(overallContent, textContent);
console.info(`Processing link: [${link}]. Similarity index: ${similarityIndex}`);
const fileName = link.replace(/[^a-zA-Z0-9]/g, "_") + ".txt";
const filePath = path.join(outputFolder, fileName);
fs.writeFileSync(filePath, textContent);
//# sourceMappingURL=save-html-content-to-file.js.map