/**
 * Rotting Fruit
 * You are given a 2-D matrix grid. Each cell can have one of three possible values:
 *
 *    0 representing an empty cell
 *    1 representing a fresh fruit
 *    2 representing a rotten fruit
 * Every minute, if a fresh fruit is horizontally or vertically adjacent to a rotten fruit, then the fresh fruit also
 * becomes rotten.
 *
 * Return the minimum number of minutes that must elapse until there are zero fresh fruits remaining. If this state is
 * impossible within the grid, return -1.
 */

const rottingFruit = (grid: number[][]) => {
  const q: number[][] = [];
  let fresh = 0;
  let time = 0;

  // Start off with all rotten fruits.
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 1) {
        fresh++;
      }
      if (grid[r][c] === 2) {
        q.push([r, c]);
      }
    }
  }

  const directions = [
    [0, 1], // Down
    [0, -1], // Up
    [1, 0], // Right
    [-1, 0], // Left
  ];
  while (fresh > 0 && q.length > 0) {
    const length = q.length;
    for (let i = 0; i < length; i++) {
      const layer = q.shift();

      if (layer) {
        const [currR, currC] = layer;
        for (const [dr, dc] of directions) {
          const row = currR + dr;
          const col = currC + dc;
          if (row >= 0 && row < grid.length &&
              col >= 0 && col < grid[0].length &&
              grid[row][col] === 1) {
            grid[row][col] = 2;
            q.push([row, col]);
            fresh--;
          }
        }
      }
    }
    time++;
  }
  return fresh === 0 ? time : -1;
};