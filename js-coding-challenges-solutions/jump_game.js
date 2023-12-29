/**
 * You are given an integer array nums. You are initially positioned at the array's first index,
 * and each element in the array represents your maximum jump length at that position.
 *
 * Return true if you can reach the last index, or false otherwise.
 */


// Dynamic Programming Solution
const canJump = (nums) => {

  // store traversed indices to avoid repeated work.
  const traversedIndices = new Set();

  const _recurseSteps = (index) => {
    if (index === nums.length - 1) {
      return true;
    }
    if (index >= nums.length) {
      return false;
    }
    if (traversedIndices.has(index)) {
      return false;
    }

    traversedIndices.add(index);

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

// Greedy Solution
const _canJump = (nums) => {
  let currGoal = nums.length - 1, nextPossibleIndex = currGoal - 1;

  while (currGoal > 0) {
    let jumps = nums[nextPossibleIndex];
    while ((jumps + nextPossibleIndex) < currGoal) {
      if (nextPossibleIndex === 0) {
        return false;
      }
      nextPossibleIndex = nextPossibleIndex - 1;
      jumps = nums[nextPossibleIndex];
    }
    currGoal = nextPossibleIndex;
    nextPossibleIndex = nextPossibleIndex - 1;
  }
  return currGoal === 0;
};

// Greedy Solution better loop
const __canJump = (nums) => {
  let goal = nums.length - 1;
  for (let i = nums.length; i >= 0; i--) {
    if (nums[i] + i >= goal) {
      goal = i;
    }
  }

  return goal === 0;
};

console.log(__canJump([3, 2, 1, 0, 4]));