/**
 * Given two strings s and t of lengths m and n respectively, return the minimum window
 * substring of s such that every character in t (including duplicates) is included in the window.
 * If there is no such substring, return the empty string "".
 *
 * The testcases will be generated such that the answer is unique.
 */
function minWindow(s, t) {
  const sChars = s.split("");
  const tChars = t.split("");
  const _tCharsMap = new Map();
  for (const tChar of tChars) {
    _tCharsMap.set(tChar, (_tCharsMap.get(tChar) || 0) + 1);
  }

  let l = 0, r = tChars.length - 1;
  const substringsIndices = [];
  while ((r - l) + 1 >= tChars.length && r < sChars.length) {
    // check substring.
    const _tCharsCopy = new Map(_tCharsMap);
    console.log("T CHARACTERS MAP BEFORE: ", _tCharsCopy);
    for (let i = l; i <= r; i++) {
      const char = sChars[i];
      let currentTotal = _tCharsCopy.get(char);
      if (currentTotal) {
        currentTotal = currentTotal - 1;
        if (currentTotal === 0) {
          _tCharsCopy.delete(char);
        }
      }
    }
    console.log("T CHARACTERS MAP AFTER: ", _tCharsCopy);
    if (_tCharsCopy.size === 0) {
      // we have found our substring. Let's save it.
      substringsIndices.push([l, r])
    }

    console.log("SUBSTRING INDICES: ", substringsIndices);
  }
}