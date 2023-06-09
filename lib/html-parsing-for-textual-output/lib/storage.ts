import {Lock} from './lock';
import {DEFAULT_OUTPUT_FOLDER_STORAGE} from "./constants";

const fs = require('fs');
const util = require('util');

const NUMBER_FILE = `${DEFAULT_OUTPUT_FOLDER_STORAGE}/number_file.txt`;

class Storage {
  private set: Set<number>;
  private lock: Lock;

  constructor() {
    this.set = new Set<number>();
    this.lock = new Lock();
  }

  printContents(): string {
    let contents = "";
    for (const key of Array.from(this.set.values())) {
      contents += key + ", "
    }
    return contents.substring(0, contents.length - 1);
  }

  async load(): Promise<void> {
    const readFile = util.promisify(fs.readFile);
    await this.lock.lock();

    try {
      const fileData = await readFile(NUMBER_FILE, 'utf-8');
      if (fileData.length > 0) {
        const array = JSON.parse(fileData);
        this.set = new Set(array);
      }
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    } finally {
      await this.lock.unlock();
    }
  }

  async save(): Promise<void> {
    const writeFile = util.promisify(fs.writeFile);
    await this.lock.lock();

    try {
      const array = Array.from(this.set);
      const fileData = JSON.stringify(array);
      await writeFile(NUMBER_FILE, fileData, 'utf-8');
    } finally {
      await this.lock.unlock();
    }
  }

  addNumber(num: number): void {
    this.set.add(num);
  }

  removeNumber(num: number): void {
    this.set.delete(num);
  }
}

export default Storage