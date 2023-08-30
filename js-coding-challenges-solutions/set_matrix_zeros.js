function printMatrix(matrix) {
  for (const row of matrix) {
    console.log(row);
  }
  console.log("----------------")
}

/**
 * Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
 *
 * You must do it in place.
 */
function setZeros(matrix) {
  const rows = new Set();
  const columns = new Set();

  for (let i = 0; i < matrix.length; i++) {
    for (let f = 0; f < matrix[i].length; f++) {
      const value = matrix[i][f];
      if (value === 0) {
        rows.add(i);
        columns.add(f);
      }
    }
  }
  console.log("rows: ", rows);
  console.log("columns", columns);

  // update rows.
  for (const row of Array.from(rows.values())) {
    for (let i = 0; i < matrix[row].length; i++) {
      matrix[row][i] = 0;
    }
  }

  // update columns.
  for (const column of Array.from(columns.values())) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][column] = 0;
    }
  }
}

const matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]];
setZeros(matrix);
printMatrix(matrix);
