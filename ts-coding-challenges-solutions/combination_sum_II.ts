/**
 * You are given an array of integers candidates, which may contain duplicates, and a target integer target.
 * Your task is to return a list of all unique combinations of candidates where the chosen numbers sum to target.
 *
 * Each element from candidates may be chosen at most once within a combination. The solution set must not contain
 * duplicate combinations.
 *
 * You may return the combinations in any order and the order of the numbers in each combination can be in any order.
 */

const combinationSum2 = (candidates: number[], target: number) => {

  const results: number[][] = [];

  const backtrack = (candidates: number[], target: number, i: number, cur: number[], total: number) => {
    if (total === target) {
      results.push([...cur]);
      return;
    }
    if (total === target || i === candidates.length) {
      return;
    }

    cur.push(candidates[i]);
    backtrack(candidates, target, i + 1, cur, total + candidates[i]);
    cur.pop();

    // Ignore all duplicate values (i.e. if [1,1,1], we'll skip all next ones since there cannot be duplicates in a
    // combination.
    while (i + 1 < candidates.length && candidates[i] === candidates[i + 1]) {
      i++;
    }
    backtrack(candidates, target, i + 1, cur, total);
  };

  candidates.sort((a, b) => a - b);
  backtrack(candidates, target, 0, [], 0);
  return results;
};

const _combinationSum2Optimal = (candidates: number[], target: number) => {
  let results: number[][] = [];

  // Sort the candidates to handle duplicates easily
  candidates.sort((a, b) => a - b);

  // Helper function for backtracking
  function backtrack(start: number, target: number, currentCombination: number[]) {
    if (target === 0) {
      results.push([...currentCombination]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      // Skip duplicates
      if (i > start && candidates[i] === candidates[i - 1]) {
        continue;
      }

      // If the current candidate exceeds the target, no point in continuing
      if (candidates[i] > target) {
        break;
      }

      // Include the current candidate
      currentCombination.push(candidates[i]);

      // Recur with the remaining target and move to the next index
      backtrack(i + 1, target - candidates[i], currentCombination);

      // Backtrack: remove the last added candidate
      currentCombination.pop();
    }
  }

  // Start the backtracking process
  backtrack(0, target, []);

  return results;
};

console.log(combinationSum2([9, 2, 2, 4, 6, 1, 5], 8));