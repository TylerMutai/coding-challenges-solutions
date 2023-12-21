/**
 * Given an integer array nums, find the
 * subarray
 *  with the largest sum, and return its sum.
 */

const maxSubArray = (nums) => {
  let max_sum = Number.NEGATIVE_INFINITY, current_sum = 0;

  for (const num of nums) {
    current_sum = num + current_sum;
    if (current_sum > max_sum) {
      max_sum = current_sum;
    }
    if (current_sum < 0) {
      current_sum = 0;
    }
  }
  return max_sum;
};

console.log(maxSubArray([-2, 1]));