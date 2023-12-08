/**
 * Given an m x n board of characters and a list of strings words, return all words on the board.
 *
 * Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are
 * horizontally or vertically neighboring.
 * The same letter cell may not be used more than once in a word.
 */

/**
 * @param {string[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
function findWords(board, words) {
  if (!board.length) {
    return [];
  }

  if (!board[0].length) {
    return [];
  }

  function ALetter(r, c, l) {
    this.r = r;
    this.c = c;
    this.l = l;
  }

  const isValid = (rc) => {
    const r = rc[0];
    const c = rc[1];
    return r >= 0 && c >= 0 && r < rLength && c < cLength;
  };

  // idx 0 = r, idx 1 = c
  const right = [1, 0];
  const left = [-1, 0];
  const up = [0, -1];
  const down = [0, 1];

  const rLength = board.length;
  const cLength = board[0].length;
  // create words and their neighbours
  const wordNeighbours = new Map();
  const startingPoints = new Map();
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      const l = new ALetter(r, c, board[r][c]);
      const neighbours = new Set();
      const _left = [r + left[0], c + left[1]];
      const _right = [r + right[0], c + right[1]];
      const _up = [r + up[0], c + up[1]];
      const _down = [r + down[0], c + down[1]];
      if (isValid(_left)) {
        neighbours.add(new ALetter(_left[0], _left[1], board[_left[0]][_left[1]]));
      }
      if (isValid(_right)) {
        neighbours.add(new ALetter(_right[0], _right[1], board[_right[0]][_right[1]]));
      }
      if (isValid(_up)) {
        neighbours.add(new ALetter(_up[0], _up[1], board[_up[0]][_up[1]]));
      }
      if (isValid(_down)) {
        neighbours.add(new ALetter(_down[0], _down[1], board[_down[0]][_down[1]]));
      }
      wordNeighbours.set(l, neighbours);
      const sPoints = startingPoints.get(l.l) || [];
      sPoints.push(l);
      startingPoints.set(l.l, sPoints);
    }
  }

  const spellableWords = [];
  for (const w of words) {
    let spellable = true;
    const chars = w.split("");
    let curr = startingPoints.get(chars[0]);
    let currIdx = 1;
    for (const l of curr) {
      while (currIdx < chars.length) {

      }
    }
    if (spellable) {
      spellableWords.push(w);
    }
  }
}

findWords([["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]],
  ["oath", "pea", "eat", "rain"],
);