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
const fs = require('fs');
const util = require('util');
const lock_1 = require("./lock");
const NUMBER_FILE = 'lock/number_file.txt';
class Storage {
    constructor() {
        this.set = new Set();
        this.lock = new lock_1.Lock();
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const readFile = util.promisify(fs.readFile);
            yield this.lock.lock();
            try {
                const fileData = yield readFile(NUMBER_FILE, 'utf-8');
                if (fileData.length > 0) {
                    const array = JSON.parse(fileData);
                    this.set = new Set(array);
                }
            }
            catch (err) {
                if (err.code !== 'ENOENT')
                    throw err;
            }
            finally {
                yield this.lock.unlock();
            }
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const writeFile = util.promisify(fs.writeFile);
            yield this.lock.lock();
            try {
                const array = Array.from(this.set);
                const fileData = JSON.stringify(array);
                yield writeFile(NUMBER_FILE, fileData, 'utf-8');
            }
            finally {
                yield this.lock.unlock();
            }
        });
    }
    addNumber(num) {
        this.set.add(num);
    }
    removeNumber(num) {
        this.set.delete(num);
    }
}
exports.default = Storage;
//# sourceMappingURL=storage.js.map