const storage = require(__dirname + "/storage");
const storageUtils = new storage();
const textSimilarity = require(__dirname + "/text-similarity-index");
const path = require("path");
const fs = require("fs");
const { workerData } = require("worker_threads");
const { link, outputFolder, textContent, overallContent } = workerData;
textSimilarity.getSimilarityIndex(overallContent, textContent).then((similarityIndex) => {
    const roundedOffSimilarityIndex = Math.round((similarityIndex + Number.EPSILON) * 100) / 100;
    console.info(`Processing link: [${link}]. Similarity index: ${similarityIndex}, Rounded off: ${roundedOffSimilarityIndex}`);
    if (link) {
        console.log("similarityIndices:   --------------- Before", storageUtils);
        storageUtils.add(roundedOffSimilarityIndex);
        console.log("similarityIndices:   --------------- After", storageUtils);
        storageUtils.add(roundedOffSimilarityIndex);
        const fileName = link.replace(/[^a-zA-Z0-9]/g, "_") + ".txt";
        const filePath = path.join(outputFolder, fileName);
        fs.writeFileSync(filePath, textContent);
    }
});
//# sourceMappingURL=save-html-content-to-file.js.map