/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j],
 * nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 *
 * Notice that the solution set must not contain duplicate triplets.
 */
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const triplets = [];
  for (let i = 0; i < nums.length; i++) {
    if (i > 0) {
      if (nums[i] === nums[i - 1]) {
        continue;
      }
    }
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r]
      if (sum === 0) {
        triplets.push([nums[i], nums[l], nums[r]]);
        l += 1;
        // to further improve performance, we can move the left pointer up to a point where there is a number different
        // from the previous.
        while (nums[l] === nums[l - 1] && l < r) {
          l += 1;
        }
      } else if (sum > 0) {
        // decrease the sum by moving the right pointer. (since it's more than zero and, we're trying to get to zero)
        r -= 1;
      } else {
        // increase the sum (since it's less than zero and, we're trying to get to zero)
        l += 1;
      }
    }
  }
  return triplets;
}

// console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// console.log(threeSum([0, 1, 1]));
// console.log(threeSum([0, 0, 0]));
// console.log(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]));
// console.log(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]));
console.log(threeSum([-1, 0, 1, 2, -1, -4]));