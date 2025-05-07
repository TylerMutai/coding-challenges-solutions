/**
 * Pacific Atlantic Water Flow
 * You are given a rectangular island heights where heights[r][c] represents the height above sea level of the cell at
 * coordinate (r, c).
 *
 * The islands border the Pacific Ocean from the top and left sides, and borders the Atlantic Ocean from the bottom and
 * right sides.
 *
 * Water can flow in four directions (up, down, left, or right) from a cell to a neighboring cell with height equal or
 * lower. Water can also flow into the ocean from cells adjacent to the ocean.
 *
 * Find all cells where water can flow from that cell to both the Pacific and Atlantic oceans.
 * Return it as a 2D list where each element is a list [r, c] representing the row and column of the cell. You may
 * return the answer in any order.
 */

const pacificAtlantic = (heights: number[][]) => {
  const getKey = (r: number, c: number) => {
    return `${r},${c}`;
  };

  const rowLength = heights.length;
  const colLength = heights[0].length;
  const atlantic = new Set<string>(), pacific = new Set<string>();


  const dfs = (r: number, c: number, prevHeight: number, visits: Set<string>) => {
    if (r >= rowLength || c >= colLength || r < 0 || c < 0 || visits.has(getKey(r,c)) ||
        heights[r][c] < prevHeight
    ) {
      return;
    }

    visits.add(getKey(r, c));
    const left = [0, -1];
    const right = [0, 1];
    const up = [-1, 0];
    const down = [1, 0];

    dfs(r + left[0], c + left[1], heights[r][c], visits);
    dfs(r + right[0], c + right[1], heights[r][c], visits);
    dfs(r + up[0], c + up[1], heights[r][c], visits);
    dfs(r + down[0], c + down[1], heights[r][c], visits);
  };

  // get cells bordering the pacific
  for (let r = 0; r < rowLength; r++) {
    dfs(r, 0, heights[r][0], pacific);
    dfs(r, colLength - 1, heights[r][colLength - 1], atlantic);
  }
  for (let c = 0; c < colLength; c++) {
    dfs(0, c, heights[0][c], pacific);
    dfs(rowLength - 1, c, heights[rowLength - 1][c], atlantic);
  }

  // check for cells in both the atlantic and the pacific.
  const res: number[][] = [];
  for (let r = 0; r < rowLength; r++) {
    for (let c = 0; c < colLength; c++) {
      if (atlantic.has(getKey(r, c)) && pacific.has(getKey(r, c))) {
        res.push([r, c]);
      }
    }
  }

  return res;
};

console.log(pacificAtlantic(
  [
    [4, 2, 7, 3, 4],
    [7, 4, 6, 4, 7],
    [6, 3, 5, 3, 6],
  ],
));