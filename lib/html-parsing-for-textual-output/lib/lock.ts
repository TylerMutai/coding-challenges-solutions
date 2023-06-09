import {DEFAULT_OUTPUT_FOLDER_LOCK} from "./constants";

const fs = require('fs');
const util = require('util');

const LOCK_FILE = 'number_file.lock';

export class Lock {
  private readonly filepath = `${DEFAULT_OUTPUT_FOLDER_LOCK}/${LOCK_FILE}`;

  constructor() {
  }

  async lock(): Promise<void> {
    const writeFile = util.promisify(fs.writeFile);

    while (true) {
      try {
        await writeFile(this.filepath, 'lock', {flag: "wx", recursive: true});
        return;
      } catch (err) {
        if (err.code === 'EEXIST') {
          await this.sleep(100);
        } else {
          throw err;
        }
      }
    }
  }

  async unlock(): Promise<void> {
    const unlink = util.promisify(fs.unlink);
    await unlink(this.filepath);
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}