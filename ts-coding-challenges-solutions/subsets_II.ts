/**
 * Given an integer array nums that may contain duplicates, return all possible subsets (the power set).
 *
 * The solution set must not contain duplicate subsets. Return the solution in any order.
 */

const subsetsWithDup = (nums: number[]) => {

  const backtrack = (start: number, subset: number[], nums: number[], res: number[][]) => {
    res.push([...subset]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) {
        continue;
      }
      subset.push(nums[i]);
      backtrack(i + 1, subset, nums, res);
      subset.pop();
    }
  };

  const res: number[][] = [];
  nums.sort((a: number, b: number) => a - b);
  backtrack(0, [], nums, res);
  return res;
};

console.log(subsetsWithDup([1, 2, 2]));