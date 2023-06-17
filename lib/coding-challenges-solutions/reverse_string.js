function reverseString(str) {

  if (!str) return str;

  return reverseString(str.substring(1)) + str.substring(0, 1)
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
console.log(reverseStringLoop(str))
console.log(reverseString(str, "", str.length - 1, str.length))