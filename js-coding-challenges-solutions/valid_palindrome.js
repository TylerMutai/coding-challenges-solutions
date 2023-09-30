function cleanUp(s) {
  const alphabet = new Set([
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
    "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8",
    "9"
  ])
  const allowedChars = [];
  const chars = s?.toLowerCase()?.split("");
  for (const char of chars) {
    if (alphabet.has(char)) {
      allowedChars.push(char);
    }
  }
  return allowedChars;
}

function isPalindrome(s) {
  const chars = cleanUp(s);
  let left = 0;
  let right = chars.length - 1;
  console.log("chars: ", chars)
  while (left < right) {
    console.log("left: ", chars[left]);
    console.log("right: ", chars[right]);
    if (chars[left] !== chars[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

// console.log(isPalindrome("A man, a plan, a canal: Panama"));
// console.log(isPalindrome("race a car"));
console.log(isPalindrome("0P"));