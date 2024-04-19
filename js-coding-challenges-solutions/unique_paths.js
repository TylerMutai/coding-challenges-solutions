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
    if (r >= m || c >= n) {
      return 0;
    }

    // move right
    let movesRight = dfs(r + rightDirection[0], c + rightDirection[1]);
    // then move down
    let movesDown = dfs(r + 1 + downDirection[0], c + 1 + downDirection[1]);

    // move down
    let _movesDown = dfs(r + downDirection[0], c + downDirection[1]);
    // then move right
    let _movesRight = dfs(r + 1 + rightDirection[0], c + 1 + rightDirection[1]);


    return 1 + movesRight + movesDown + _movesDown + _movesRight;
  };

  console.log(traversedPaths);
  return dfs(0, 0);
};

console.log(uniquePaths(3, 2));
// console.log(uniquePaths(3, 2));