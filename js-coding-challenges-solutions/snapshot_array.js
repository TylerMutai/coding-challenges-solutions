class SnapshotArray {
  #internalArr;
  #snapId = 0;

  #snapShots = {};

  /**
   * @param {number} length
   */
  constructor(length) {
    this.length = length;
    const arrayWithNulls = [];
    for (let i = 0; i < length; i++) {
      arrayWithNulls.push(null);
    }
    this.#internalArr = arrayWithNulls;
  }

  /**
   * @param {number} index
   * @param {number} val
   * @return {void}
   */
  set(index, val) {
    if (index >= this.length) {
      throw Error(`Index [${index}] is out of bounds!`);
    }
    this.#internalArr[index] = val
  }

  /**
   * @return {number}
   */
  snap() {
    const current = this.#snapId;
    this.#snapShots[current] = [...this.#internalArr];
    this.#snapId++;
    return current;
  }

  /**
   * @param {number} index
   * @param {number} snapId
   * @return {number | null}
   */
  get(index, snapId) {
    const snapshotArr = this.#snapShots[snapId];
    if (snapshotArr) {
      if (index < snapshotArr.length) {
        return snapshotArr[index];
      }
    }
    return null;
  }
}