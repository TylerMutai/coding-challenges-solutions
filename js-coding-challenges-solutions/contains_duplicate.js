/**
 * Given an integer array nums,
 * return true if any value appears at least twice in the array, and return false if every element is distinct.
 */
function containsDuplicate(nums) {
  const sol1 = solutionQuasilinearTime(nums);
  const sol2 = solutionSomehowLinearTime([...nums]);
  const sol3 = solutionLinearTime(nums);
  return [sol1, sol2, sol3];
}

function solutionQuasilinearTime(nums) {
  const numbersSet = new Set();
  for (const num of nums) {
    if (numbersSet.has(num)) {
      return true;
    }
    numbersSet.add(num);
  }
  return false;
}

function solutionSomehowLinearTime(nums) {
  nums.sort((a, b) => a - b);
  console.log("sorted nums", nums);

  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] === nums[i]) {
      return true;
    }
  }
  return false;
}

function solutionLinearTime(nums) {
  const numsSet = new Set(nums);
  return numsSet.size !== nums.length;
}

console.log(containsDuplicate([1, 2, 3, 1]));

