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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Function to recursively copy files from the source directory to the target directory
const allowedExtensions = new Set([
    ".csv",
    ".docx",
    ".doc",
    ".enex",
    ".eml",
    ".epub",
    ".html",
    ".md",
    ".msg",
    ".odt",
    ".pdf",
    ".pptx",
    ".ppt",
    ".txt",
]);
const extensionsToConvertToTxt = new Set([
    "dart"
]);
function copyFilesRecursively(source, target) {
    const files = fs.readdirSync(source);
    files.forEach((file) => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);
        console.log("Source destination is defined as: ", source);
        console.log("Target destination is defined as: ", target);
        if (fs.statSync(sourcePath).isDirectory()) {
            if (!fs.existsSync(targetPath)) {
                console.log("Creating directory now at: ", targetPath);
                fs.mkdirSync(targetPath);
            }
            copyFilesRecursively(sourcePath, targetPath);
        }
        else {
            console.log("Handling file: ", file);
            const extension = path.extname(sourcePath);
            if (extensionsToConvertToTxt.has(extension)) {
                // if file has extension that is in  [extensionsToConvertToTxt], rename it
                console.log(`Renaming file extension from '${extension}' to '.txt`);
                fs.copyFileSync(sourcePath, path.join(target, path.basename(file, path.extname(file)) + '.txt'));
            }
            else {
                // if the file extension is part of allowed extensions, copy the file.
                if (allowedExtensions.has(extension)) {
                    console.log("Copying file from: ", sourcePath, " to", targetPath);
                    fs.copyFileSync(sourcePath, targetPath);
                }
            }
        }
    });
    console.log("File copying complete.");
}
function main() {
    const sourceDirectory = process.argv[2];
    const targetDirectory = process.argv[3];
    if (!fs.existsSync(sourceDirectory)) {
        console.log(`Source directory: ${sourceDirectory} does not exist.`);
        return;
    }
    if (!fs.existsSync(targetDirectory)) {
        console.log(`Target directory: ${targetDirectory} does not exist. Creating it now...`);
        fs.mkdirSync(targetDirectory);
    }
    copyFilesRecursively(sourceDirectory, targetDirectory);
}
main();
