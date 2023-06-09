import Storage from "./storage";
import getSimilarityIndex from "./text-similarity-index"

const storageUtils = new Storage();
// Create the file in the output folder
const path = require("path")
const fs = require("fs")

const {workerData, parentPort} = require("node:worker_threads");

const {link, outputFolder, textContent, overallContent} = workerData;

const doWork = async () => {
  const similarityIndex = await getSimilarityIndex(overallContent, textContent);
  const roundedOffSimilarityIndex = Math.round((similarityIndex + Number.EPSILON) * 100) / 100
  let message = `Processing link: [${link}]. Similarity index: ${similarityIndex}, Rounded off: ${roundedOffSimilarityIndex}`;

  if (link) {
    try {
      message += "similarityIndices:   --------------- Before"
      await storageUtils.load();
      message += " StorageUtils" + storageUtils.printContents() + "\n"
      storageUtils.addNumber(roundedOffSimilarityIndex);
      await storageUtils.save();
      message += "similarityIndices:   --------------- After"
      message += " StorageUtils" + storageUtils.printContents() + "\n"
      storageUtils.addNumber(roundedOffSimilarityIndex)
      const fileName = link.replace(/[^a-zA-Z0-9]/g, "_") + ".txt";
      const filePath = path.join(outputFolder, fileName);
      fs.writeFileSync(filePath, textContent);
    } catch (e) {
      message += `Error processing link [${link}] `
      message += e.toString();
    }
  }
  return message;
}

doWork().then(res => parentPort.postMessage(res))





