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
exports.Lock = void 0;
const fs = require('fs');
const util = require('util');
const LOCK_FILE = 'number_file.lock';
class Lock {
    constructor() {
        this.filepath = `lock/${LOCK_FILE}`;
    }
    lock() {
        return __awaiter(this, void 0, void 0, function* () {
            const writeFile = util.promisify(fs.writeFile);
            const flag = 'wx';
            while (true) {
                try {
                    yield writeFile(this.filepath, '', { flag });
                    return;
                }
                catch (err) {
                    if (err.code === 'EEXIST') {
                        yield this.sleep(100);
                    }
                    else {
                        throw err;
                    }
                }
            }
        });
    }
    unlock() {
        return __awaiter(this, void 0, void 0, function* () {
            const unlink = util.promisify(fs.unlink);
            yield unlink(this.filepath);
        });
    }
    sleep(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, ms));
        });
    }
}
exports.Lock = Lock;
//# sourceMappingURL=lock.js.map