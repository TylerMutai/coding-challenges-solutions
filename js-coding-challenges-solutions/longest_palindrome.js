/**
 * Given a string s, return the longest
 * palindromic
 *
 * substring
 *  in s.
 *
 *  Example:
 *
 * Input: s = "babad"
 * Output: "bab"
 * Explanation: "aba" is also a valid answer.
 */

const expandFromMid = (s) => {
  const chars = s.split("");
  let currLen = 0;
  let r, l;

  // check for odd length substrings
  for (let mid = 0; mid < chars.length; mid++) {
    for (let x = 0; mid - x >= 0 && mid + x < chars.length; x++) {
      if (chars[mid - x] !== chars[mid + x]) {
        break;
      }
      const newLen = (2 * x )+ 1;
      if (newLen > currLen) {
        l = mid - x;
        r = mid + x;
        currLen = newLen;
      }
    }
  }

  // check for even length substrings
  for (let mid = 0; mid < chars.length; mid++) {
    for (let x = 0; mid - (x + 1) >= 0 && mid + x < chars.length; x++) {
      let char1 = chars[mid - (x + 1)];
      let char2 = chars[mid + x];
      console.log(`x=${x} && mid=${mid} && mid-x+1=${mid - (x + 1)} && mid+x=${mid + x}`);
      console.log(`COMPARING: char=${char1} && char=${char2}`);
      console.log("------------------");
      if (char1 !== char2) {
        break;
      }
      const newLen = 2*(x+1);
      if (newLen > currLen) {
        l = mid - (x + 1);
        r = mid + x;
        currLen = newLen;
      }
    }
  }

  console.log(`LONGEST SUBSTRING RANGE: l=${l} & r=${r}`);
  console.log(`CURRENT LENGTH: ${currLen}`);

  return s.substring(l, r + 1);
};


const longestPalindrome = (s) => {
  return expandFromMid(s);
};

console.log(longestPalindrome("babad"));