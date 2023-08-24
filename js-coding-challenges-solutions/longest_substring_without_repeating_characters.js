/**
 *
 * Given a string s, find the length of the longest
 * substring without repeating characters.
 */
function lengthOfLongestSubstring(s) {
  const sChars = s.split("");
  let l = 0, res = 0;
  let charsSet = new Set();
  for (let r = 0; r < sChars.length; r++) {
    const charRight = sChars[r];
    const charLeft = sChars[l];
    while (charsSet.has(charRight)) {
      charsSet.delete(charLeft);
      l += 1;
    }
    charsSet.add(charRight);
    res = Math.max(res, r - l + 1)
  }
  return res;
}

function _lengthOfLongestSubstring(s) {
  const sChars = s.split("");
  let l = 0, res = 0;
  let charsMap = new Map();
  for (let r = 0; r < sChars.length; r++) {
    const charRight = sChars[r];
    if (charsMap.has(charRight)) {
      l = Math.max(l, charsMap.get(charRight) + 1)
    }
    charsMap.set(charRight, r);
    res = Math.max(res, r - l + 1);
  }
  return res;
}

console.log(lengthOfLongestSubstring("dvdf"));
console.log(_lengthOfLongestSubstring("dvdf"));