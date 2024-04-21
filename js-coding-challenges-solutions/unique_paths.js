/**
 * There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The
 * robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or
 * right at any point in time.
 *
 * Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the
 * bottom-right corner.
 *
 * The test cases are generated so that the answer will be less than or equal to 2 * 109.
 */
const uniquePaths = function (m, n) {
  const traversedPaths = [];
  for (let i = 0; i < m + 1; i++) {
    traversedPaths.push([]);
    for (let f = 0; f < n + 1; f++) {
      traversedPaths[i][f] = -1;
    }
  }

  // brute force.
  // r->m, c->n
  const dfs = (r, c) => {
    if (r === 1 || c === 1) {
      return 1;
    }
    if (traversedPaths[r][c] !== -1) {
      return traversedPaths[r][c];
    }
    traversedPaths[r][c] = dfs(r - 1, c) + dfs(r, c - 1);

    return traversedPaths[r][c];
  };

  console.log(traversedPaths);
  return dfs(m, n);
};

console.log(uniquePaths(3, 2));