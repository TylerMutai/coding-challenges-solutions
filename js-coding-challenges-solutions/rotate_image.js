function printMatrix(matrix) {
  for (const row of matrix) {
    console.log(row);
  }
  console.log("----------------")
}

function rotateBy90Degrees(matrix) {
  const size = matrix.length;
  let l = 0, r = size - 1;

  while (l < r) {
    let top = l, bottom = r;
    for (let i = 0; i < r - l; i++) {

      // store top left
      const topLeft = matrix[top][l + i];

      // replace top left with bottom left.
      matrix[top][l + i] = matrix[bottom - i][l];

      // replace bottom left with bottom right.
      matrix[bottom - i][l] = matrix[bottom][r - i];

      // replace bottom right with top right
      matrix[bottom][r - i] = matrix[top + i][r];

      // replace top right with top left
      matrix[top + i][r] = topLeft

      printMatrix(matrix);
    }
    l++;
    r--;
  }
}

function rotateImage(matrix) {
  rotateBy90Degrees(matrix);
}

const matrix = [
  [5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]
];

printMatrix(matrix)
rotateImage(matrix);
