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
  const downDirection = [1, 0];
  const rightDirection = [0, 1];
  const cache = new Map();
  // r is row, therefore m
  // c is column, therefore n

  // brute force.
  const dfs = (r, c) => {
    if (r >= m || c >= n) {
      return 0;
    }
    if (cache.has(r + c)) {
      return cache.get(r + c);
    }
    const right = dfs((r + rightDirection[0]), (c + rightDirection[1]));
    const down = dfs((r + downDirection[0]), (c + downDirection[1]));
    if (r === m - 1 && c === n - 1) {
      // a valid path.
      return 1 + right + down;
    }
    return right + down;
  };

  return dfs(0, 0);
};

// console.log(uniquePaths(3, 7));
console.log(uniquePaths(3, 2));