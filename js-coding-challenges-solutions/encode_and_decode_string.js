/**
 * Design an algorithm to encode a list of strings to a string.
 * The encoded string is then sent over the network and is decoded back to the original list of strings.
 *
 * Please implement encode and decode
 */

function encode(strings) {

  // Our encoding algorithm will be as follows:
  // We put the length of the string first, followed by a delimiter(#), followed by the actual string.
  const delimiter = "#";
  let encodedString = "";
  for (const s of strings) {
    encodedString = `${encodedString}${s.length}${delimiter}${s}`;
  }

  return encodedString;
}


function decode(string) {
  const delimiter = "#";
  const stringCharacters = string.split("");

  let originalStrings = [];
  let current = 0;
  let currentLength = "";
  while (current < stringCharacters.length) {
    if (stringCharacters[current] === delimiter) {
      const len = parseInt(currentLength);
      let start = current + 1;
      let aString = "";
      for (let f = start; f < start + len; f++) {
        aString += stringCharacters[f];
      }
      originalStrings.push(aString);
      current = current + len;
      currentLength = "";
    } else {
      currentLength += stringCharacters[current];
    }
    current = current + 1;

  }

  return originalStrings;

}

const encoded = encode(["4sdewe34ewrewflin222t", "423432 co3de", "4lrewr  ewr   ewrew    ove", "3you"])
console.log("encoded", encoded);
const decoded = decode(encoded);
console.log("decoded", decoded);