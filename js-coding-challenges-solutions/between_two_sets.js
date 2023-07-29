/*
 * Complete the 'getTotalX' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER_ARRAY b
 */

function getTotalX(a, b) {
  const lcm = getLCM(a);
  const gcd = getGCD(b);

  let current = lcm;

  let foundNumbers = 0;
  while (current <= gcd) {
    if (gcd % current === 0) {
      foundNumbers++;
    }
    current += lcm;
  }

  return foundNumbers;
}

function getLCM(numbers) {
  let lcm = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    lcm = getLCM_(lcm, numbers[i]);
  }
  return lcm;
}

function getGCD(numbers) {
  let gcd = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    gcd = getGCD_(gcd, numbers[i]);
  }
  return gcd;
}

function getLCM_(n1, n2) {
  return (n1 * n2) / getGCD_(n1, n2)
}

let count = 0;

function getGCD_(n1, n2) {
  if (n1 === 0) {
    return n2;
  }
  if (n2 === 0) {
    return n1;
  }
  if (n1 === n2 || count > 10) {
    return n1;
  }
  if (n1 > n2) {
    n1 = n1 % n2;
    return getGCD_(n1, n2);
  } else {
    n2 = n2 % n1;
    return getGCD_(n1, n2);
  }
}

console.log(getTotalX([2, 3, 6], [42, 84]));