/**
 * A message containing letters from A-Z can be encoded into numbers using the following mapping:
 *
 * 'A' -> "1"
 * 'B' -> "2"
 * ...
 * 'Z' -> "26"
 * To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the
 * mapping above (there may be multiple ways). For example, "11106" can be mapped into:
 *
 * "AAJF" with the grouping (1 1 10 6)
 * "KJF" with the grouping (11 10 6)
 * Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".
 *
 * Given a string s containing only digits, return the number of ways to decode it.
 *
 * The test cases are generated so that the answer fits in a 32-bit integer.
 */

/**
 * Implementation with O(n) memory
 * @param s
 */
const numDecodings = (s) => {
  const chars = s.split("");

  const dfs = (i) => {
    if (i >= chars.length) {
      return 1;
    }

    if (chars[i] === "0") {
      return 0;
    }

   let singleDigitDecode = dfs(i + 1);
    let doubleDigitDecode = 0;
    if(i + 1 < chars.length){
      const char = `${chars[i]}${chars[i+1]}`;
      const charInt = parseInt(char);
      if(charInt >= 10 && charInt <=26){
        doubleDigitDecode = dfs(i + 2);
      }
    }

    return singleDigitDecode + doubleDigitDecode;
  };
  return dfs(0);
};
console.log(numDecodings("226"));


// f & g
// g = 1; // represents the running total
// for (let i=1;i<chars.length;i++){
// const c = chars[i];
// let h = 0;
// if (c !== "0") {
// h = g;
// }
// if (chars
//