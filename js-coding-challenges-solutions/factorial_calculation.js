/**
 *
 * Getting factorial implementation - recursive.
 */
function getFactorialRecursive(num) {
  if (num === 1) return num;

  return getFactorialRecursive(num - 1) * num;
}

/**
 * Getting factorial implementation - iterative
 */
function getFactorialIterative(num) {
  let product = 1;
  for (let i = 1; i <= num; i++) {
    product = product * i;
  }

  return product;
}

console.log("Recursive: ", getFactorialRecursive(15));
console.log("Iterative: ", getFactorialIterative(15));
