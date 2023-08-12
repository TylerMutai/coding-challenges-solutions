/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 *
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 *
 * You can return the answer in any order.
 */

function twoSum(nums, target) {
  return solutionQuadraticTime(nums, target);
}

function solutionQuadraticTime(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let f = 0; f < nums.length; f++) {
      if (i !== f) {
        if ((nums[i] + nums[f]) === target) {
          return [i, f];
        }
      }
    }
  }
  return [];
}

console.log(twoSum([0, 4, 3, 0], 0))