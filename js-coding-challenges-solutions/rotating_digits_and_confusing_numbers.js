/**
 * The Challenge:
 * We can rotate digits by 180 degrees to form new digits.
 * When 0, 1, 6, 8, 9 are rotated 180 degrees, they become 0, 1, 9, 8, 6 respectively.
 * When 2, 3, 4, 5, and 7 are rotated 180 degrees, they become invalid.
 * A confusing number is a number that when rotated 180 degrees becomes a different number with each digit valid.(Note that the rotated number can be greater than the original number.) Given a positive integer N, return the number of confusing numbers between 1 and N inclusive.
 */
function numberOfConfusingNumbers(n) {
  let current = 0;
  let noOfConfusingNumbers = 0;
  while (current <= n) {
    const rotatedCurrent = rotateDigits(current + "");
    if (rotatedCurrent) {
      if ((current + "") !== rotatedCurrent) {
        noOfConfusingNumbers++;
      }
    }
    // console.log("Current", current);
    // console.log("Rotated Current", rotatedCurrent);
    // console.log("confusing numbers", noOfConfusingNumbers);
    current++;
  }
  return noOfConfusingNumbers;
}

function rotateDigits(digits) {
  const rotatableDigits = {
    "0": "0",
    "1": "1",
    "6": "9",
    "8": "8",
    "9": "6",
  };

  let rotatedDigits = ""
  const digitsChars = digits.split("");
  const rotatedDigitsChars = [];
  for (let i = digitsChars.length - 1; i >= 0; i--) {
    rotatedDigitsChars.push(digitsChars[i]);
  }
  for (const char of rotatedDigitsChars) {
    const rotatedDigit = rotatableDigits[char];
    if (!rotatedDigit) {
      return undefined;
    }
    rotatedDigits += rotatedDigit
  }
  return rotatedDigits;
}

console.log(numberOfConfusingNumbers(100))