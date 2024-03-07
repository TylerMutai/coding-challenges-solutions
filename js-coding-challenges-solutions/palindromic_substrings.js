/**
 * Given a string s, return the number of palindromic substrings in it.
 *
 * A string is a palindrome when it reads the same backward as forward.
 *
 * A substring is a contiguous sequence of characters within the string.
 */


/**
 *
 * O(n.n.n)
 */
const _quadraticSolution = (s) => {
  const chars = s.split("");

  // every character is a substring by itself.
  const substrings = [...chars];

  let currLen = 2;

  while (currLen <= chars.length) {
    for (let i = 0; i < chars.length; i++) {
      let substring = "";
      let revSubstring = "";

      // Form the substring equal to [currenLen]
      if (currLen + i <= chars.length) {
        for (let f = i; f < currLen + i; f++) {
          substring += chars[f];
        }
        for (let f = currLen + i - 1; f >= i; f--) {
          revSubstring += chars[f];
        }
        if (substring === revSubstring) {
          substrings.push(substring);
        }
      }
    }
    currLen++;
  }
  console.log("SUBSTRINGS: ", substrings);
  return substrings.length;
};

/**
 *
 * O(n.n)
 */
const _exponentialSolution = (s) => {
  const chars = s.split("");
  let substrings = 0;

  // odd number substrings.
  for (let i = 0; i < chars.length; i++) {
    let l = i, r = i;
    while (l >= 0 && r < chars.length) {
      if (chars[l] === chars[r]) {
        substrings++;
      } else {
        break;
      }
      l--;
      r++;
    }
  }

  // even number substrings.
  for (let i = 0; i < chars.length; i++) {
    let l = i, r = l + 1;
    while (l >= 0 && r < chars.length) {
      if (chars[l] === chars[r]) {
        substrings++;
      } else {
        break;
      }
      l--;
      r++;
    }
  }
  return substrings;
};

const countSubstrings = (s) => {
  return _exponentialSolution(s);
};

console.log(countSubstrings("fdsklf"));