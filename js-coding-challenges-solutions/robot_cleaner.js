/**
 * Given a robot cleaner in a room modeled as a grid.
 *
 * Each cell in the grid can be empty or blocked.
 *
 * The robot cleaner with 4 given APIs can move forward, turn left or turn right. Each turn it made is 90 degrees.
 *
 * When it tries to move into a blocked cell, its bumper sensor detects the obstacle, and it stays on the current cell.
 *
 * Design an algorithm to clean the entire room using only the 4 given APIs shown below.
 */
function robotCleaner(matrix) {
  const ROWS = matrix.length;
  const COLUMNS = matrix[0].length;

  console.log("ROWS: ", ROWS);
  console.log("COLUMNS: ", COLUMNS);

  const paths = new Set();

  function dfs(r, c) {
    if (r < 0 || c < 0 || r === ROWS || c === COLUMNS || matrix[r][c] === 0 || paths.has(`${r}${c}`)) {
      return 0;
    }

    // move right
    let resRight = dfs(r + 1, c)
    if (resRight) {
      paths.set(`${r + 1}${c}`)
    }

    // move left
    let resLeft = dfs(r - 1, c)
    if (resLeft) {
      paths.set(`${r - 1}${c}`)
    }

    // move top
    let resTop = dfs(r, c + 1)
    if (resTop) {
      paths.set(`${r}${c + 1}`)
    }

    // move bottom
    let resBottom = dfs(r, c - 1)
    if (resBottom) {
      paths.set(`${r}${c - 1}`)
    }

    return 1;
  }

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      dfs(r, c);
    }
  }
  return paths;
}

console.log("Paths: ", robotCleaner(
  [
    [1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1]
  ]
));