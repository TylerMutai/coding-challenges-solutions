function getDivisors(num) {
  const sqrt = Math.ceil(Math.sqrt(num))

  // We'll use a set to ensure we have unqiue divisors
  const divisors = new Set();

  for (let i = 1; i <= sqrt; i++) {
    if (num % i === 0) {
      // perfect divisor (no remainders, so basically the result of the division is the other factor)
      // as [i] increases, then its multiple decreases, therefore at some point we'll encounter numbers that
      // we already considered as factors. As such we use a Set to ensure we don't have duplicates.
      divisors.add(i)
      divisors.add(num / i);
    }
  }
  // Since 1 is divisible by every number, our initial factor when i=1 will be 100.
  // Factors of a number n however, should be all numbers divisible by n except n. As such,
  // we remove this number from the Set. This operation isn't expensive since it is a requirement
  // that implementations of Sets be sublinear/logarithmic (O(log n)) at least.
  divisors.delete(num)
  return Array.from(divisors.values())
}

function getSum(numArray) {
  let sum = 0;
  for (const num of numArray) {
    sum += num;
  }
  return sum
}

function getDPA(num) {
  let abundant = new Set(), deficient = new Set(), perfect = new Set();
  for (let i = 1; i <= num; i++) {
    const sum = getSum(getDivisors(i))
    if (sum === i) {
      perfect.add(i);
    } else if (sum > i) {
      abundant.add(i);
    } else {
      deficient.add(i)
    }
  }
  return [deficient.size, perfect.size, abundant.size]
}

console.log(getDPA(20000))
