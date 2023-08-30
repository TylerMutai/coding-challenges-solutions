/**
 *
 * You are given an m x n binary matrix grid. An island is a group of 1's (representing land)
 * connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
 *
 * The area of an island is the number of cells with a value 1 in the island.
 *
 * Return the maximum area of an island in grid. If there is no island, return 0.
 */

function getIdentifier(r, c) {
  return `${r}-${c}`;
}

function parseIdentifier(coordinates) {
  const [r, c] = coordinates.split("-");
  return [parseInt(r), parseInt(c)];
}

function maxAreaOfIsland(grid) {
  const visitsBfs = new Set();
  const visitsDfs = new Set();
  let areasBfs = [];
  let areasDfs = [];
  if (!grid.length) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === 0 || visitsDfs.has(getIdentifier(r, c))) {
      return 0;
    }
    visitsDfs.add(getIdentifier(r, c));
    let area = 0;
    for (const dir of directions) {
      area += dfs(r + dir[0], c + dir[1]);
    }
    return 1 + area;
  }

  function bfs(r, c) {
    const q = [getIdentifier(r, c)];
    visitsBfs.add(getIdentifier(r, c));

    let area = 0;
    while (q.length) {
      const [row, col] = parseIdentifier(q.shift());
      for (const dir of directions) {
        const [r, c] = [row + dir[0], col + dir[1]];
        if (r >= 0 && c >= 0 && r < rows && c < cols && grid[r][c] === 1 && !visitsBfs.has(getIdentifier(r, c))) {
          q.push(getIdentifier(r, c));
          visitsBfs.add(getIdentifier(r, c));
        }
      }
      area++;
    }
    areasBfs.push(area);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const area = dfs(r, c);
      if (area) {
        areasDfs.push(area);
      }

      if (grid[r][c] === 1 && !visitsBfs.has(getIdentifier(r, c))) {
        bfs(r, c);
      }
    }
  }
  console.log("areasBfs", areasBfs);
  console.log("areasDfs", areasDfs);

  let maxArea = 0;
  for (const a of areasBfs) {
    if (a > maxArea) {
      maxArea = a;
    }
  }
  return maxArea;
}

console.log(maxAreaOfIsland(
  [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]
))