/**
 * Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order,
 * find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1]
 * and numbers[index2] where 1 <= index1 < index2 < numbers.length.
 *
 * Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.
 *
 * The tests are generated such that there is exactly one solution. You may not use the same element twice.
 *
 * Your solution must use only constant extra space.
 */

function twoSum(numbers, target) {
  const numbersSet = new Set(numbers);
  const numbersIndices = new Map();
  for (let i = 0; i < numbers.length; i++) {
    numbersIndices.set(numbers[i], i);
  }

  for (let i = 0; i < numbers.length; i++) {
    const numToSearch = target - numbers[i];
    if (numbersSet.has(numToSearch)) {
      return [i + 1, numbersIndices.get(numToSearch) + 1];
    }
  }
  return [];
}

function _twoSum(numbers, target) {
  for (let l = 0, r = numbers.length - 1; l < r;) {
    const sum = numbers[l] + numbers[r];
    if (sum === target) {
      return [l + 1, r + 1];
    }
    if (sum > target) {
      r--;
    } else {
      l++;
    }
  }
  return [];
}

console.log(twoSum([-3, 3, 4, 90], 0));
console.log(_twoSum([-3, 3, 4, 90], 0));