function reverseString(str, newStr, idx, strLen) {

  if (idx === strLen - 1) return newStr + str[strLen - 1];

  return reverseString(str, newStr + str[idx], idx - 1, str.length)
}

function reverseStringLoop(str) {
  const newString = [];
  const chars = str.split("");
  for (let i = chars.length - 1; i >= 0; i--) {
    newString.push(chars[i]);
  }

  return newString.join("");
}

const str = "mercy ni mresh";
// console.log(reverseStringLoop(str))
console.log(reverseString(str, "", str.length - 1, str.length))