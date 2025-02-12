/**
 * Given two strings s and t of lengths m and n respectively, return the minimum window
 * substring of s such that every character in t (including duplicates) is included in the window.
 * If there is no such substring, return the empty string "".
 *
 * The testcases will be generated such that the answer is unique.
 */


function minWindow(s: string, t: string) {
  if (!s.length || !t.length) {
    return "";
  }
  if (t.length > s.length) {
    return "";
  }

  const window = new Map<string, number>();
  const countT = new Map<string, number>();

  // Save a count of all characters in string t (which is the substring we're looking for) since
  // we also need to include duplicates.
  for (const c of t.split("")) {
    countT.set(c, (countT.get(c) || 0) + 1);
  }

  let have = 0, need = t.length;

  let res: number[] = [], resLen = Number.MAX_SAFE_INTEGER;

  const sChars = s.split("");
  let l = 0;
  let r;
  for (r = 0; r < sChars.length; r++) {
    const c = sChars[r];

    // save to window
    window.set(c, (window.get(c) || 0) + 1);


    if (countT.has(c) && window.has(c) && window.get(c)! <= countT.get(c)!) {
      have += 1;
    }

    while (have === need) {
      // Update result substring (which should be the smallest)
      if (r - l + 1 < resLen) {
        res = [l, r];
        resLen = r - l + 1;
      }

      // Pop from the left of our window.
      const currWindowSize = (window.get(sChars[l]) || 1) - 1;
      window.set(sChars[l], currWindowSize);

      if (countT.has(s[l]) && currWindowSize < countT.get(s[l])!) {
        have -= 1;
      }
      l += 1;
    }
  }

  if (res.length) {
    return s.substring(res[0], res[1] + 1);
  }
  return "";

}

console.log(minWindow("ADOBECODEBANC", "ABC"));
console.log(minWindow("a", "aa"));