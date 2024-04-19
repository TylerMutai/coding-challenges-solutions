/**
 * Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common
 * subsequence, return 0.
 *
 * A subsequence of a string is a new string generated from the original string with some characters (can be none)
 * deleted without changing the relative order of the remaining characters.
 *
 * For example, "ace" is a subsequence of "abcde".
 * A common subsequence of two strings is a subsequence that is common to both strings.
 */

const longestCommonSubsequence = function (text1, text2) {

  const t1Chars = text1.split("");
  const t2Chars = text2.split("");

  const cache = [];
  for (let i = 0; i < t1Chars.length + 1; i++) {
    cache.push([]);
    for (let f = 0; f < t2Chars.length + 1; f++) {
      cache[i][f] = -1;
    }
  }

  function recurse(idx1, idx2) {
    if (idx1 === 0 || idx2 === 0) {
      return 0;
    }

    if (cache[idx1][idx2] !== -1) {
      return cache[idx1][idx2];
    }

    if (t1Chars[idx1 - 1] === t2Chars[idx2 - 1]) {
      cache[idx1][idx2] = 1 + recurse(idx1 - 1, idx2 - 1);
      return cache[idx1][idx2];
    }
    const op2 = recurse(idx1, idx2 - 1);
    const op3 = recurse(idx1 - 1, idx2);
    cache[idx1][idx2] = Math.max(op2, op3);
    return cache[idx1][idx2];
  }

  return recurse(t1Chars.length, t2Chars.length);
};