/**
 * You are given an integer array nums. You are initially positioned at the array's first index,
 * and each element in the array represents your maximum jump length at that position.
 *
 * Return true if you can reach the last index, or false otherwise.
 */

const canJump = (nums) => {

  const _recurseSteps = (index) => {
    if (index === nums.length - 1) {
      return true;
    }
    if (index >= nums.length) {
      return false;
    }

    let jumps = nums[index];
    while (jumps >= 1) {
      const res = _recurseSteps(index + jumps);
      if (res) {
        return res;
      }
      jumps--;
    }

    return false;
  };

  return _recurseSteps(0);
};

console.log(canJump([3, 2, 1, 0, 4]));