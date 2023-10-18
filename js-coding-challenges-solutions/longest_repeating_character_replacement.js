/**
 * You are given a string s and an integer k. You can choose any character of the string
 * and change it to any other uppercase English character. You can perform this operation at most k times.
 *
 * Return the length of the longest substring containing the same letter you can get after performing the above operations.
 */
function characterReplacement(s, k) {
  let l = 0, r = 0;
  let _longestSubstring = 0;
  const sChars = s.split("");

  const characterCounts = new Map();
  // set count for first char.
  if (l < sChars.length) {
    characterCounts.set(sChars[l], 1);
  }
  while (r < sChars.length) {
    console.log("L: ", l);
    console.log("R: ", r);

    console.log("CHARACTER COUNTS: ", characterCounts);
    let maxOccurrence = 0;
    const values = Array.from(characterCounts.values());
    for (const val of values) {
      maxOccurrence = Math.max(maxOccurrence, val);
    }

    console.log("MAX OCCURRENCE: ", maxOccurrence);
    const strLength = (r - l) + 1;
    console.log("STRING LENGTH: ", strLength);
    const charsToChange = strLength - maxOccurrence;

    console.log("CHARS TO CHANGE: ", charsToChange);
    if (charsToChange <= k) {
      _longestSubstring = Math.max(_longestSubstring, strLength)

      // increment r.
      r++;
      characterCounts.set(sChars[r], (characterCounts.get(sChars[r]) || 0) + 1);

    } else {
      // remove the [l]th character since it's now not part of the window.
      characterCounts.set(sChars[l], (characterCounts.get(sChars[l]) || 1) - 1);

      l++;
    }
    console.log("--------------------------");
  }
  return _longestSubstring;
}

console.log(characterReplacement("ABAA", 0));