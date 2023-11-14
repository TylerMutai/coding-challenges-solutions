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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var openai_1 = require("openai");
var fs = require("fs");
var promptFile = "./prompt.md";
var cssFile = "./code.css";
var responseFile = "./response";
var configuration = new openai_1.Configuration({
    apiKey: process.env.API_KEY,
});
var openai = new openai_1.OpenAIApi(configuration);
function writePromptResponse(filePath, result) {
    fs.writeFileSync(filePath, result, { flag: 'a' });
}
function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}
function getGPTResponse(text) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var resultString, response, gptRes, e_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    resultString = "";
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, openai.createChatCompletion({
                            model: "gpt-4",
                            messages: [
                                {
                                    "role": "system",
                                    "content": text
                                }
                            ],
                            max_tokens: 8192,
                            temperature: 1,
                            top_p: 1,
                            frequency_penalty: 0,
                            presence_penalty: 0,
                        })];
                case 2:
                    response = _d.sent();
                    console.log("RESPONSE STATUS: ", response.status);
                    if (((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.choices) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                        gptRes = (_c = response.data.choices[0].message) === null || _c === void 0 ? void 0 : _c.content;
                        if (gptRes) {
                            resultString = gptRes;
                        }
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _d.sent();
                    console.log("ERROR: ", e_1);
                    return [3 /*break*/, 4];
                case 4:
                    console.log("#############-------------------################");
                    return [2 /*return*/, resultString];
            }
        });
    });
}
function processGPT(prompt, index) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getGPTResponse(prompt)];
                case 1:
                    res = _a.sent();
                    console.log("GPT-4 RESPONSE: ", res);
                    console.log("##############################");
                    console.log("\n");
                    writePromptResponse("".concat(responseFile, "_").concat(index, ".md"), res);
                    return [2 /*return*/];
            }
        });
    });
}
function gpt4Function() {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, css, cssBlocks, i, block, promptWithCSS;
        return __generator(this, function (_a) {
            prompt = readFile(promptFile);
            css = readFile(cssFile);
            cssBlocks = css.split("\n\n\n\n");
            // Iterate over blocks
            for (i = 0; i < cssBlocks.length; i++) {
                block = cssBlocks[i];
                if (block.length) {
                    promptWithCSS = prompt.replace(/#-#-#/gi, block);
                    console.log("CURRENT BLOCK: ", block);
                    console.log("##############################");
                    console.log("PROMPT WITH CSS: ", promptWithCSS);
                    console.log("\n");
                    processGPT(promptWithCSS, i).then();
                }
            }
            return [2 /*return*/];
        });
    });
}
gpt4Function();
