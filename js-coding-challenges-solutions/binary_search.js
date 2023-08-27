/**
 * Given an array of integers nums which is sorted in ascending order,
 * and an integer target, write a function to search target in nums.
 * If target exists, then return its index. Otherwise, return -1.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 */
function binarySearch(nums, target) {
  let l = 0, r = nums.length - 1;

  while (l <= r) {
    const midpoint = Math.floor((l + r) / 2);
    const value = nums[midpoint];
    if (value === target) {
      return midpoint;
    }

    if (target > value) {
      l = midpoint + 1;
    } else {
      r = midpoint - 1;
    }
  }

  return -1;
}

console.log(binarySearch([5], 5))