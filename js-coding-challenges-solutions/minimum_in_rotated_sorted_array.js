/**
 * Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:
 *
 * [4,5,6,7,0,1,2] if it was rotated 4 times.
 * [0,1,2,4,5,6,7] if it was rotated 7 times.
 * Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].
 *
 * Given the sorted rotated array nums of unique elements, return the minimum element of this array.
 *
 * You must write an algorithm that runs in O(log n) time.
 */
function findMin(nums) {
  let l = 0, r = nums.length - 1;

  let minimumValue = null;
  while (l < r) {
    const midpoint = Math.ceil((l + r) / 2);
    console.log("MIDPOINT: ", midpoint);
    console.log("MIDPOINT-VAL: ", nums[midpoint]);
    if (midpoint === 0) {
      l = midpoint + 1;
      minimumValue = nums[midpoint];
      continue;
    }
    const valBeforeMidpoint = nums[midpoint - 1];
    console.log("valBeforeMidpoint: ", valBeforeMidpoint);
    console.log("nums[r]: ", nums[r]);
    if (nums[midpoint] < valBeforeMidpoint) {
      minimumValue = nums[midpoint];
      l = midpoint + 1;
    } else if (nums[midpoint] > nums[r]) {
      // search right half of array.
      l = midpoint + 1;
    } else {
      // search left half of array.
      r = midpoint - 1;
    }
    console.log("R", r);
    console.log("L", l);
  }
  if (minimumValue === null) {
    if (l >= 0) {
      minimumValue = nums[l];
    } else if (r >= 0) {
      minimumValue = nums[r];
    }
  }
  return minimumValue;
}

console.log(findMin([1, 2]));