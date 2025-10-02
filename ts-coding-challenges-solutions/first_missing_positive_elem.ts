/**
 * Find first missing positive element from an array
 *
 * Given an unsorted integer array nums, return the smallest missing positive integer.
 * E.g. what is the smallest positive integer that does not apper in the input array that should.
 */

const firstMissingPositiveElem = (nums: number[]) => {
  let smallest = Number.MAX_SAFE_INTEGER;
  const numsSet = new Set<number>(nums);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < smallest && nums[i] >= 0) {
      smallest = nums[i];
    }
  }

  while (true) {
    smallest++;
    if (!numsSet.has(smallest)) {
      return smallest;
    }
  }
};

console.log(firstMissingPositiveElem([1, 2, 0]));
console.log(firstMissingPositiveElem([3, 4, -1, 1]));