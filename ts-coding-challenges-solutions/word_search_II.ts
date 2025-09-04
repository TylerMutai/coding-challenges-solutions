/**
 * Given a 2-D grid of characters board and a string word, return true if the word is present in the grid, otherwise
 * return false.
 *
 * For the word to be present it must be possible to form it with a path in the board with horizontally or vertically
 * neighboring cells. The same cell may not be used more than once in a word.
 */
const exist = (board: string[][], word: string) => {

  const chars = word.split("");
  // stores the paths we just traversed.
  const paths = new Set<string>();
  const rows = board.length;
  const cols = board[0].length;

  const getPathName = (r: number, c: number) => {
    return `${r}${c}`;
  };

  // 'i' represents the current index of the word we are creating.
  const dfs = (r: number, c: number, i: number): boolean => {

    if (i === chars.length) {
      // We have completed the full word, return true.
      return true;
    }

    if (r < 0 || c < 0 || r >= rows || c >= cols || paths.has(getPathName(r, c))) {
      return false;
    }
    if (chars[i] !== board[r][c]) {
      return false;
    }

    paths.add(getPathName(r, c));
    const left = dfs(r - 1, c, i + 1);
    const right = dfs(r + 1, c, i + 1);
    const top = dfs(r, c - 1, i + 1);
    const bottom = dfs(r, c + 1, i + 1);

    paths.delete(getPathName(r, c));
    return left || right || top || bottom;
  };

  // Loop through all positions on the board and see whether we get a match.
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) {
        return true;
      }
    }
  }

  return false;

};

console.log(exist(
  [
    ["A", "B", "C", "D"],
    ["S", "A", "A", "T"],
    ["A", "C", "A", "E"],
  ],
  "CA",
));