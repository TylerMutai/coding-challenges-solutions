/**
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 */
function isAnagram(s, t) {
  const sol1 = solutionQuasilinearTime(s, t);
  const sol2 = solutionLinearTime(s, t);
  return [sol1, sol2];
}

function solutionQuasilinearTime(s, t) {
  if (s.length !== t.length) {
    return false;
  }
  const sMap = new Map();
  const sChars = s.split("")
  for (const char of sChars) {
    const current = sMap.get(char) || 0;
    sMap.set(char, current + 1);
  }
  const tMap = new Map();
  const tChars = t.split("")
  for (const char of tChars) {
    const current = tMap.get(char) || 0;
    tMap.set(char, current + 1);
  }

  // loop through keys of either map - totals should be equal
  const keys = Array.from(sMap.size > tMap.size ? sMap.keys() : tMap.keys());

  for (const k of keys) {
    const tCount = tMap.get(k);
    const sCount = sMap.get(k);
    if (tCount !== sCount) {
      return false;
    }
  }
  return true;
}

function solutionLinearTime(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  // assuming unicode characters of only the latin alphabet, we create an array of length 123 and init to 0
  const length = 123;
  const sArr = [];
  const tArr = [];
  for (let i = 0; i < length; i++) {
    sArr.push(0);
    tArr.push(0);
  }

  // split both strings, and use their unicode value (in decimal - base 10) as index.
  const sChars = s.split("");
  for (const char of sChars) {
    const index = char.codePointAt(0)
    sArr[index] = sArr[index] + 1;
  }
  const tChars = t.split("");
  for (const char of tChars) {
    const index = char.codePointAt(0)
    tArr[index] = tArr[index] + 1;
  }

  for (const char of sChars) {
    const index = char.codePointAt(0)
    if (sArr[index] !== tArr[index]) {
      return false;
    }
  }
  return true;
}

console.log(isAnagram("dgqztusjuu", "dqugjzutsu"))