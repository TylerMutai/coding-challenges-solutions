/**
 * You are a professional robber planning to rob houses along a street.
 * Each house has a certain amount of money stashed.
 * All houses at this place are arranged in a circle.
 * That means the first house is the neighbor of the last one.
 * Meanwhile, adjacent houses have a security system connected,
 * and it will automatically contact the police if two adjacent houses were broken into on the same night.
 *
 * Given an integer array nums representing the amount of money of each house,
 * return the maximum amount of money you can rob tonight without alerting the police.
 */

function rob(nums) {
  const nums1 = nums.slice(0, nums.length - 1);
  const nums2 = [nums[nums.length - 1], ...nums.slice(0,nums.length-2)];
  console.log("NUMS 1: ", nums1);
  console.log("NUMS 2: ", nums2);

  // [rob1, rob2, n, n+1, n+2, ....]
  let rob1 = 0, rob2 = 0;
  for (const n of nums1) {
    const temp = Math.max(n + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }

  let _rob1 = 0, _rob2 = 0;
  for (const n of nums2) {
    const temp = Math.max(n + _rob1, _rob2);
    _rob1 = _rob2;
    _rob2 = temp;
  }

  return Math.max(rob2,_rob2);
}

console.log(rob([1,2,3,1]));