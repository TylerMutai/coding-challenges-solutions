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

  function recurse(idx1, idx2) {
    if (idx2 < 0) {
      return 0;
    }
    if (idx1 < 0) {
      return 0;
    }

    if (t1Chars[idx1] === t2Chars[idx2]) {
      return 1 + recurse(idx1 - 1, idx2 - 1);
    }
    const op2 = recurse(idx1 - 2, idx2 - 1);
    const op3 = recurse(idx1 - 1, idx2 - 2);
    return Math.max(op2, op3);
  }

  const lastIdx1 = t1Chars.length - 1;
  const lastIdx2 = t2Chars.length - 1;
  const op1 = recurse(lastIdx1, lastIdx2);
  const op2 = recurse(lastIdx1 - 1, lastIdx2);
  const op3 = recurse(lastIdx1, lastIdx2 - 1);
  console.log("op1", op1);
  console.log("op2", op2);
  console.log("op3", op3);

  return Math.max(op1, Math.max(op2, op3));
};

console.log(longestCommonSubsequence("ezupkr", "ubmrapg"));
// console.log(longestCommonSubsequence("abcde", "ace"));
// console.log(longestCommonSubsequence("abc", "abc"));