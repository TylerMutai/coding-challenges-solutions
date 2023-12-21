/**
 * Given an array of distinct integers candidates and a target integer target,
 * return a list of all unique combinations of candidates where the chosen numbers sum to target.
 * You may return the combinations in any order.
 *
 * The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the
 * frequency
 *  of at least one of the chosen numbers is different.
 *
 * The test cases are generated such that the number of unique combinations that sum up to target is less than 150
 * combinations for the given input.
 */

function combinationSum(candidates, target) {
  const result = [];
  candidates.sort((a, b) => a - b);

  const backtrack = (cand, start, target, list) => {
    if (target < 0) {
      return;
    }
    if (target === 0) {
      result.push([...list]);
    }
    for (let i = start; i < cand.length; i++) {
      list.push(cand[i]);
      backtrack(cand, i, target - cand[i], list);
      list.pop();
    }
  };

  backtrack(candidates, 0, target, [], result);
  return result;
}

console.log(combinationSum([2, 3, 5], 8));