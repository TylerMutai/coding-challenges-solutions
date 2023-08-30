/**
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
 *
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
 * You may assume all four edges of the grid are all surrounded by water.
 */
function getIdentifier(r, c) {
  return `${r}-${c}`;
}

function parseIdentifier(coordinates) {
  const [r, c] = coordinates.split("-");
  return [parseInt(r), parseInt(c)];
}

function numIslands(grid) {
  if (grid.length === 0) {
    return 0;
  }

  let islands = 0;
  const visits = new Set();
  const rows = grid.length;
  const cols = grid[0].length;

  function bfs(r, c) {
    const q = [getIdentifier(r, c)];
    visits.add(getIdentifier(r, c));

    while (q.length) {
      const [row, col] = parseIdentifier(q.shift());
      const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
      for (const dir of directions) {
        const [r, c] = [row + dir[0], col + dir[1]];
        if (r < rows && c < cols && grid[row][col] === "1" && !visits.has(getIdentifier(r, c))) {
          q.push(getIdentifier(r, c));
          visits.add(getIdentifier(r, c));
        }
      }
    }
  }

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "1" && !visits.has(getIdentifier(r, c))) {
        bfs(r, c);
        islands++;
      }
    }
  }
  return islands;
}

console.log(numIslands(
  [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"]
  ]
));