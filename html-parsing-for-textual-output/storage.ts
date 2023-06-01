const fs = require('fs');
const filename = "storage.txt";

export const getSimilarityIndicesStruct = () => {
  let set = new Set<number>();
  try {
    set = new Set(JSON.parse(fs.readFileSync(filename)))
  } catch (e) {
    // intentionally left blank
  }

  return set;
}

export const saveSimilarityIndicesStruct = (set: Set<number>) => {
  fs.writeFileSync(filename, JSON.stringify(Array.from(set)))
}