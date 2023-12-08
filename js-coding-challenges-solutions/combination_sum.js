/**
 * Given an array of distinct integers candidates and a target integer target,
 * return a list of all unique combinations of candidates where the chosen numbers sum to target.
 * You may return the combinations in any order.
 *
 * The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the
 * frequency
 *  of at least one of the chosen numbers is different.
 *
 * The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.
 */

function combinationSum(candidates, target) {
  candidates.sort((a, b) => a - b);
  console.log("SORTED CANDIDATES: ", candidates);
  const factors = [];
  const candidatesSet = new Set();
  for (const c of candidates) {
    candidatesSet.add(c);
  }

  console.log("SORTED CANDIDATES SET: ", candidatesSet);
  const leastNumber = candidates[0];
  if (candidatesSet.has(target)) {
    factors.push(target);
  }
  for (const c of candidates) {
    let difference = target - c;
    while (difference >= leastNumber) {
      if (candidatesSet.has(c)) {
        factors.push(c);
      }
      difference = difference - c;
    }
  }
  console.log("FACTORS: ", factors);

  const factorsLevel2 = [];
  for (const f of factors) {
    factorsLevel2.push(target - f);
  }
  console.log("FACTORS LEVEL 2: ", factorsLevel2);
}

combinationSum([2, 3, 6, 7], 7);