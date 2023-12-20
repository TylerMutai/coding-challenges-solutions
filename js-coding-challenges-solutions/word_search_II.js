/**
 * Given an m x n board of characters and a list of strings words, return all words on the board.
 *
 * Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are
 * horizontallyOR vertically neighboring.
 * The same letter cell may not be used more than once in a word.
 */
// TODO: @Baly finish this. You need more practice.
import {TrieDictionary} from "./trie_dictionary/trie_dictionary";

/**
 * @param {string[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
function findWords(board, words) {

  // we'll be using our prior Trie implementation.
  const trie = new TrieDictionary();
  for (const w of words) {
    trie.insertWord(w);
  }

  // idx 0 = r, idx 1 = c
  const right = [1, 0];
  const left = [-1, 0];
  const up = [0, -1];
  const down = [0, 1];

  const ROWS = board.length, COLS = board[0].length;
  const res = new Set(), visits = new Set();
  const dfs = (r, c, trieEntry, word) => {
    if (r < 0 || c < 0 || r === ROWS || c === COLS || visits.has([r, c]) || !trieEntry.words.includes(board[r][c])) {
      return;
    }
    visits.add([r, c]);
    trieEntry = trieEntry.visits.delete([r, c]);

  };

}

findWords([["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]],
  ["oath", "pea", "eat", "rain"],
);