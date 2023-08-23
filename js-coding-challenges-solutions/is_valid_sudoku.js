/**
 * Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
 *
 * Each row must contain the digits 1-9 without repetition.
 * Each column must contain the digits 1-9 without repetition.
 * Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
 * Note:
 *
 * A Sudoku board (partially filled) could be valid but is not necessarily solvable.
 * Only the filled cells need to be validated according to the mentioned rules.
 */
function isValidSudoku(board) {
  for (let x = 0; x < 9; x++) {
    // init sets
    let row = new Set();
    let col = new Set();
    let grd = new Set();

    for (let y = 0; y < 9; y++) {
      // ea box is a position on a cartesian plane
      let rowBox = board[x][y];
      let colBox = board[y][x];

      // formula to automate positioning in 3x3 sub-grids
      let xGrd = (3 * Math.floor(x / 3) + Math.floor(y / 3));
      let yGrd = (3 * (x % 3) + (y % 3));
      let grdBox = board[xGrd][yGrd];

      // check rows, ignoring empties
      if (rowBox !== ".") {
        // position = duplicated num
        if (row.has(rowBox)) return false;
        // position != duplicated num
        row.add(rowBox);  // add to set
      }
      // check cols
      if (colBox !== ".") {
        if (col.has(colBox)) return false
        col.add(colBox);
      }
      // check 3x3 sub-grids
      if (grdBox !== ".") {
        if (grd.has(grdBox)) return false
        grd.add(grdBox);
      }
    }
  }
  // nested loops finish iteration w/out exiting early
  return true;  // board is valid sudoku
}


console.log(isValidSudoku(
  [[".", ".", ".", ".", "5", ".", ".", "1", "."],
    [".", "4", ".", "3", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "3", ".", ".", "1"],
    ["8", ".", ".", ".", ".", ".", ".", "2", "."],
    [".", ".", "2", ".", "7", ".", ".", ".", "."],
    [".", "1", "5", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "2", ".", ".", "."],
    [".", "2", ".", "9", ".", ".", ".", ".", "."],
    [".", ".", "4", ".", ".", ".", ".", ".", "."]]
))