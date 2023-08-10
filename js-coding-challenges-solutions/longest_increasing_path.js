/**
 * Given an m x n integers matrix, return the length of the longest increasing path in matrix.
 *
 * From each cell, you can either move in four directions: left, right, up, or down.
 * You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).
 */
function longestIncreasingPath(matrix) {
  const ROWS = matrix.length;
  const COLUMNS = matrix[0].length;

  console.log("ROWS: ", ROWS);
  console.log("COLUMNS: ", COLUMNS);

  const computedLIPs = Array.from(Array(ROWS), () => new Array(COLUMNS))

  function dfs(r, c, prevValue) {
    if (r < 0 || c < 0 || r === ROWS || c === COLUMNS || matrix[r][c] <= prevValue) {
      return 0;
    }

    // avoid re-computation if value was already cached.
    if (computedLIPs[r]) {
      if (computedLIPs[r][c]) {
        return computedLIPs[r][c]
      }
    }

    let res = 1;
    res = Math.max(res, 1 + dfs(r + 1, c, matrix[r][c]))
    res = Math.max(res, 1 + dfs(r - 1, c, matrix[r][c]))
    res = Math.max(res, 1 + dfs(r, c + 1, matrix[r][c]))
    res = Math.max(res, 1 + dfs(r, c - 1, matrix[r][c]))
    computedLIPs[r][c] = res;
    return res;
  }

  let longestPath = 0;

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      let lPath = dfs(r, c, -1);
      if (lPath > longestPath) {
        longestPath = lPath;
      }
    }
  }
  console.log("computedLIPs: ", computedLIPs)
  return longestPath;
}

console.log("Longest Path: ", longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]]));