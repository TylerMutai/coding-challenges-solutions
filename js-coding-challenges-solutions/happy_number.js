/**
 * Write an algorithm to determine if a number n is happy.
 *
 * A happy number is a number defined by the following process:
 *
 * Starting with any positive integer, replace the number by the sum of the squares of its digits.
 * Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a
 * cycle which does not include 1.
 * Those numbers for which this process ends in 1 are happy.
 * Return true if n is a happy number, and false if not.
 */
function squaresOfDigits(n) {
  const digits = `${n}`.split("");
  let sum = 0;
  for (const digitString of digits) {
    const digit = parseInt(digitString);
    if (!isNaN(digit)) {
      sum += digit * digit;
    }
  }
  return sum;
}

function isHappy(n) {
  const checkedNumbers = new Set();
  let newN = n;
  while (newN !== 1) {
    if (checkedNumbers.has(newN)) {
      return false;
    }
    checkedNumbers.add(newN);
    newN = squaresOfDigits(newN);
  }
  return true;
}

console.log(isHappy(2));