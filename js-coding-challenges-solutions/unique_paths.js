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
  let paths = [];
  const validPaths = new Set();
  // r is row, therefore m
  // c is column, therefore n

  // brute force.
  const dfs = (r, c) => {
    if (r >= m || c >= n) {
      paths = [];
      return 0;
    }
    if (validPaths.has(r + c)) {
      return 1;
    }
    const right = dfs((r + rightDirection[0]), (c + rightDirection[1]));
    const down = dfs((r + downDirection[0]), (c + downDirection[1]));
    paths.push(r + c);
    if (r === m - 1 && c === n - 1) {
      // a valid path.
      for (const p of paths) {
        validPaths.add(p);
      }
      paths = [];
      return 1 + right + down;
    }
    return right + down;
  };

  return dfs(0, 0);
};

console.log(uniquePaths(3, 2));
// console.log(uniquePaths(3, 2));