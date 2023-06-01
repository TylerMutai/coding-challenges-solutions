"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSimilarityIndicesStruct = exports.getSimilarityIndicesStruct = void 0;
const fs = require('fs');
const filename = "storage.txt";
const getSimilarityIndicesStruct = () => {
    let set = new Set();
    try {
        set = new Set(JSON.parse(fs.readFileSync(filename)));
    }
    catch (e) {
        console.log(e);
    }
    return set;
};
exports.getSimilarityIndicesStruct = getSimilarityIndicesStruct;
const saveSimilarityIndicesStruct = (set) => {
    fs.writeFileSync(filename, JSON.stringify(Array.from(set)));
};
exports.saveSimilarityIndicesStruct = saveSimilarityIndicesStruct;
