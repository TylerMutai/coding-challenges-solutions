/**
 * Given an m x n matrix, return all elements of the matrix in spiral order.
 */

function populateArray(arr, val) {
  if (val != null) {
    arr.push(val);
  }
}

function spiralMatrix(matrix) {
  const spiral = [];
  if (matrix.length === 0) {
    return spiral;
  }
  const traversedIndices = new Set();
  try {
    let l = 0, top = 0, r = matrix[0].length - 1, bottom = matrix.length - 1;

    while (l <= r && top <= bottom) {
      const topSpiral = [], rightSpiral = [], bottomSpiral = [], leftSpiral = [];
      const max = Math.max(r - l, bottom - top);

      // inject top
      for (let i = 0; i <= max; i++) {
        const topIncrement = l + i;
        const tIdx = `${top}-${topIncrement}`;
        if (!traversedIndices.has(tIdx)) {
          if (matrix[top]) {
            populateArray(topSpiral, matrix[top][topIncrement]);
            traversedIndices.add(tIdx);
          }
        }
      }

      for (let i = 0; i <= max; i++) {
        const rightIncrement = top + 1 + i;
        const rIdx = `${rightIncrement}-${r}`;
        if (!traversedIndices.has(rIdx)) {
          if (matrix[rightIncrement]) {
            populateArray(rightSpiral, matrix[rightIncrement][r]);
            traversedIndices.add(rIdx);
          }
        }
      }

      for (let i = 0; i <= max; i++) {
        const bottomIncrement = r - 1 - i;
        const bIdx = `${bottom}-${bottomIncrement}`;
        if (!traversedIndices.has(bIdx)) {
          if (matrix[bottom]) {
            populateArray(bottomSpiral, matrix[bottom][bottomIncrement])
            traversedIndices.add(bIdx);
          }
        }
      }

      for (let i = 0; i <= max; i++) {
        const leftIncrement = bottom - 1 - i;
        const lIdx = `${leftIncrement}-${l}`;
        if (!traversedIndices.has(lIdx)) {
          if (matrix[leftIncrement] && leftIncrement > 0) {
            populateArray(leftSpiral, matrix[leftIncrement][l]);
            traversedIndices.add(lIdx);
          }
        }
      }
      spiral.push(...[...topSpiral, ...rightSpiral, ...bottomSpiral, ...leftSpiral]);
      l++;
      r--;
      top++;
      bottom--;
    }
  } catch
    (e) {
    // Possibly a null index exception?
    console.log(e);
  }
  return spiral;
}

function _spiralMatrix(matrix){

}

console.log(spiralMatrix([[2, 5], [8, 4], [0, -1]]));