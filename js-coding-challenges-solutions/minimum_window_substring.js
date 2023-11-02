/**
 * Given two strings s and t of lengths m and n respectively, return the minimum window
 * substring of s such that every character in t (including duplicates) is included in the window.
 * If there is no such substring, return the empty string "".
 *
 * The testcases will be generated such that the answer is unique.
 */
function minWindow(s, t) {
  const tChars = t.split("");
  const tCharsToMap = new Map();
  const sCharsToMap = new Map();
  for (const tChar of tChars) {
    const currentCount = tCharsToMap.get(tChar) || 0;
    tCharsToMap.set(tChar, currentCount + 1);
    sCharsToMap.set(tChar, 0);
  }
  console.log("tCharsToMap: ", tCharsToMap);

  const tCharsLen = tChars.length;
  console.log("tCharsLen: ", tCharsLen);

  const sChars = s.split("");

  const substringIndices = [];
  let l = 0, r = 0;
  let currentWindowLength = 0;

  while (l < sChars.length && r < sChars.length) {

    for (const tChar of tChars){
      if (sCharsToMap.get(tChar) !== tCharsToMap.get(tChar)){
        // condition not met. move right pointer.

      }
    }
  }
}