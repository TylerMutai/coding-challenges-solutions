/**
 * You are given an array of integers candidates, which may contain duplicates, and a target integer target.
 * Your task is to return a list of all unique combinations of candidates where the chosen numbers sum to target.
 *
 * Each element from candidates may be chosen at most once within a combination. The solution set must not contain
 * duplicate combinations.
 *
 * You may return the combinations in any order and the order of the numbers in each combination can be in any order.
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var combinationSum2 = function (candidates, target) {
    var results = [];
    var backtrack = function (candidates, target, i, cur, total) {
        if (total === target) {
            results.push(__spreadArray([], cur, true));
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
    candidates.sort(function (a, b) { return a - b; });
    backtrack(candidates, target, 0, [], 0);
    return results;
};
console.log(combinationSum2([9, 2, 2, 4, 6, 1, 5], 8));
