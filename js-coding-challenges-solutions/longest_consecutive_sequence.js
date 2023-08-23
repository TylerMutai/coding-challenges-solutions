/**
 * Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
 *
 * You must write an algorithm that runs in O(n) time.
 */

function longestConsecutive(nums) {
  if (nums.length === 0) {
    return 0;
  }
  nums.sort((a, b) => a - b);
  const numsWithoutDuplicates = [nums[0]];
  for (let i = 0; i < nums.length; i++) {
    if (numsWithoutDuplicates[numsWithoutDuplicates.length - 1] !== nums[i]) {
      numsWithoutDuplicates.push(nums[i]);
    }
  }

  let consecutiveNumbers = [];
  let currentConsecutiveNumber = [numsWithoutDuplicates[0]];
  for (let i = 1; i < numsWithoutDuplicates.length; i++) {
    if (currentConsecutiveNumber[currentConsecutiveNumber.length - 1] + 1 === numsWithoutDuplicates[i]) {
      currentConsecutiveNumber.push(numsWithoutDuplicates[i]);
    } else {
      consecutiveNumbers.push(currentConsecutiveNumber);
      currentConsecutiveNumber = [numsWithoutDuplicates[i]];
    }
  }

  if (currentConsecutiveNumber.length > 0) {
    consecutiveNumbers.push(currentConsecutiveNumber);
  }

  let longest = 0;
  for (const numbers of consecutiveNumbers) {
    if (numbers.length > longest) {
      longest = numbers.length;
    }
  }
  return longest;
}

console.log(longestConsecutive([1, 2, 0, 1]));