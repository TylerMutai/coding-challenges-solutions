/**
 * Islands and Treasure
 * You are given an m×n 2D grid initialized with these three possible values:
 *
 *    -1 - A water cell that can not be traversed.
 *    0 - A treasure chest.
 *    INF - A land cell that can be traversed. We use the integer 2^31 - 1 = 2147483647 to represent INF.
 *
 * Fill each land cell with the distance to its nearest treasure chest. If a land cell cannot reach a treasure chest
 * than the value should remain INF.
 *
 * Assume the grid can only be traversed up, down, left, or right.
 *
 * Modify the grid in-place.
 */

const islandsAndTreasure = (grid: number[][]) => {
  let ROWS = grid.length;
  let COLS = grid[0].length;
  let visit = new Set<string>();
  let q: number[][] = [];

  const getVisitKey = (r: number, c: number) => `${r},${c}`;

  /**
   * @param {number} r
   * @param {number} c
   */
  const addCell = (r: number, c: number) => {
    if (r < 0 || c < 0 || r === ROWS || c === COLS ||
        visit.has(getVisitKey(r, c)) || grid[r][c] === -1
    ) {
      return;
    }
    visit.add(getVisitKey(r, c));
    q.push([r, c]);
  };

  // Pre-fill the treasure cells first, then we'll simultaneously traverse them incrementing steps.
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 0) {
        q.push([r, c]);
        visit.add(getVisitKey(r, c));
      }
    }
  }

  let dist = 0;
  while (q.length) {
    let len = q.length;
    for (let i = 0; i < len; i++) {
      let layer = q.shift();
      if (layer) {
        const [r, c] = layer;
        grid[r][c] = dist;
        addCell(r + 1, c);
        addCell(r - 1, c);
        addCell(r, c + 1);
        addCell(r, c - 1);
      }
    }
    dist += 1;
  }
};