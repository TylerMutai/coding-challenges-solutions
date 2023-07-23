function getFactorial(num) {
  if (num <= 0) return num;
  if (num === 1) {
    return num;
  }

  return getFactorial(num - 1) * num;
}

console.log(getFactorial(5))


// num = 5;

// first run:
// input: 5
// output: getFactorial(4) * 5
// previous output: 24
// final output: 24 * 5 = 120

// input: 4
// output: getFactorial(3) * 4
// previous output: 6
// final output: 6 * 4 = 24

// input: 3
// output: getFactorial(2) * 3
// previous output: 2
// final output: 2 * 3 = 6


// input: 2
// output: getFactorial(1) * 2
// previous output: 1
// final output: 1 * 2 = 2

// second run:
// input 1:
// output: 1 * 1;