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
const cheerio_1 = require("cheerio");
const puppeteer_1 = require("puppeteer");
const process_html_content_1 = require("./process-html-content");
const { Worker } = require("worker_threads");
function parseAndDownloadLinks(targetUrl, html, outputFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        const $ = (0, cheerio_1.load)(html);
        const links = new Set();
        $("a").each((_, elem) => {
            const link = $(elem).attr("href");
            if (link) {
                links.add(new URL(link, targetUrl).href);
            }
        });
        const browser = yield puppeteer_1.default.launch({ headless: "new" });
        const page = yield browser.newPage();
        yield page.goto(targetUrl);
        yield page.addScriptTag({
            content: `
      document.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement) {
          const link = event.target.closest('a[href]');
          if (link) {
            window.linkCollector = window.linkCollector || [];
            window.linkCollector.push(link.href);
          }
        }
        
        // Add the event listener for browser URL change.
        const originalLocation = window.location.href;
        window.addEventListener('popstate', (event) => {
          window.linkCollector = window.linkCollector || [];
          window.linkCollector.push(document.location);
        });
      });
    `,
        });
        const jsLinks = yield page.$$eval("a", (anchors) => {
            const links = anchors.map((anchor) => anchor.href);
            return links.concat(window.linkCollector || []);
        });
        jsLinks.forEach((link) => links.add(new URL(link, targetUrl).href));
        yield browser.close();
        const allPromises = [];
        for (const link of links) {
            allPromises.push((0, process_html_content_1.fetchAndSaveContent)(targetUrl, link));
        }
        const htmlContent = yield Promise.all(allPromises);
        let overallContent = "";
        for (const hc of htmlContent) {
            overallContent += hc[1];
        }
        return new Promise((resolve, reject) => {
            for (const hc of htmlContent) {
                const worker = new Worker(__dirname + `/save-html-content-to-file.ts`, {
                    workerData: {
                        link: hc[0],
                        outputFolder,
                        textContent: hc[1],
                        overallContent: overallContent
                    }
                });
                worker.on('message', resolve);
                worker.on('error', reject);
                worker.on('exit', (code) => {
                    if (code !== 0)
                        reject(new Error(`Worker stopped with exit code ${code}`));
                });
            }
        });
    });
}
const DEFAULT_OUTPUT_FOLDER = "/tmp/html-web-parser/output";
const ABORT_MISSION_COMMAND = "forfeit-mission";
(() => __awaiter(void 0, void 0, void 0, function* () {
    let targetUrl;
    let outputFolder;
    process.argv.forEach(function (val, index) {
        if (index === 2) {
            if (val.includes("help")) {
                console.info(`Prerequisites: ${(0, process_html_content_1.getLineSeparator)()}` +
                    "'node' in this help statement refers to any program/package that can parse " +
                    `javascript or typescript files and execute them.${(0, process_html_content_1.getLineSeparator)()}` +
                    `Commands ${(0, process_html_content_1.getLineSeparator)()}To print this help statement, type: 'node help'${(0, process_html_content_1.getLineSeparator)()}` +
                    `To specify targetUrl (required) type in: 'node https://google.com' where 'https://google.com' is targetUrl${(0, process_html_content_1.getLineSeparator)()}` +
                    `To specify output folder, type in: 'node [targetUrl] output/' where 'output/' is the output folder${(0, process_html_content_1.getLineSeparator)()}`);
                targetUrl = "forfeit-mission";
            }
            else {
                targetUrl = val;
            }
        }
        if (index === 3) {
            outputFolder = val;
        }
    });
    if (!targetUrl) {
        throw Error("[targetUrl] not specified. Pass this as an argument: i.e: 'node https://example.com' where 'https://" +
            "example.com' is the targetUrl");
    }
    if (targetUrl === ABORT_MISSION_COMMAND) {
        return;
    }
    if (!outputFolder) {
        console.info(`[outputFolder] not provided. will default to: ${DEFAULT_OUTPUT_FOLDER}. Note that this data will be deleted upon reboot.`);
        outputFolder = DEFAULT_OUTPUT_FOLDER;
    }
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
    }
    const content = yield (0, process_html_content_1.fetchAndSaveContent)(targetUrl, targetUrl);
    if (content) {
        yield parseAndDownloadLinks(targetUrl, content[1], outputFolder);
    }
    console.log(`Finished processing '${targetUrl}'. Check the '${outputFolder}' folder.${(0, process_html_content_1.getLineSeparator)()}`);
}))();
//# sourceMappingURL=html-web-parser.js.map