"use strict";
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
exports.fetchAndSaveContent = exports.getLineSeparator = void 0;
const axios = require("axios");
const cheerio = require('cheerio');
function getLineSeparator() {
    return "\n------------------------------------------------\n";
}
exports.getLineSeparator = getLineSeparator;
function getUrlDomain(url) {
    const urlObj = new URL(url);
    return urlObj.hostname;
}
function extractText(html) {
    const $ = cheerio.load(html);
    const text = getTextFromNode($("body"));
    return text.trim();
    function getTextFromNode(node) {
        if (node.length === 0) {
            return "";
        }
        const nodeType = node[0].type;
        if (nodeType === "text") {
            return node[0].data.trim() + " ";
        }
        let text = "";
        node.contents().each((_, childNode) => {
            text += getTextFromNode($(childNode));
        });
        return text;
    }
}
const IGNORED_LINKS = [
    "#"
];
// returns index 0 as the filename and index 1 as the text content.
function fetchAndSaveContent(targetUrl, link) {
    return __awaiter(this, void 0, void 0, function* () {
        let overallContent = ["", ""];
        console.info(`Processing Link: ${link}\n`);
        const baseDomain = getUrlDomain(targetUrl);
        console.info(`Using base domain as: ${baseDomain}\n`);
        if (IGNORED_LINKS.includes(link) || !link.includes(baseDomain)) {
            console.info(`Link ignored: ${link}${getLineSeparator()}`);
            return overallContent;
        }
        try {
            // Fetch the content
            const response = yield axios.get(link);
            const content = response.data;
            // Extract text from the HTML content
            const textContent = extractText(content);
            overallContent = [link, textContent];
        }
        catch (error) {
            console.error(`Error fetching content from ${link}:`, error === null || error === void 0 ? void 0 : error.message);
        }
        console.info(`Link processed: ${link}`);
        console.info(getLineSeparator());
        return overallContent;
    });
}
exports.fetchAndSaveContent = fetchAndSaveContent;
