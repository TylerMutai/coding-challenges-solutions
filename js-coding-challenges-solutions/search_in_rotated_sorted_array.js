/**
 * There is an integer array nums sorted in ascending order (with distinct values).
 *
 * Prior to being passed to your function, nums is possibly rotated at an unknown
 * pivot index k (1 <= k < nums.length) such that the resulting array is
 * [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).
 * For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
 *
 * Given the array nums after the possible rotation and an integer target,
 * return the index of target if it is in nums, or -1 if it is not in nums.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 */
function search(nums, target) {
  let l = 0, r = nums.length - 1;

  if (nums[l] === target) return l;
  while (l <= r) {
    const midpoint = Math.ceil((l + r) / 2);
    console.log("MIDPOINT: ", midpoint);
    console.log("MIDPOINT-VAL: ", nums[midpoint]);
    if (nums[midpoint] === target) return midpoint;
    if (nums[midpoint] > nums[r]) {
      // this portion is partially sorted.
      if (target <= nums[midpoint - 1] && target >= nums[l]) {
        // target should be in this half.
        r = midpoint - 1;
      } else {
        l = midpoint + 1;
      }
    } else {
      // this portion is sorted.
      if (target >= nums[midpoint + 1] && target <= nums[r]) {
        // target should be in this half.
        l = midpoint + 1;
      } else {
        r = midpoint - 1;
      }
    }
    console.log("R", r);
    console.log("L", l);
  }
  return -1;
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 5))