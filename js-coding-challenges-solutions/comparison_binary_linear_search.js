/**
 * Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common
 * subsequence, return 0.
 *
 * A subsequence of a string is a new string generated from the original string with some characters (can be none)
 * deleted without changing the relative order of the remaining characters.
 *
 * For example, "ace" is a subsequence of "abcde".
 * A common subsequence of two strings is a subsequence that is common to both strings.
 */

const records = 1000000000;
const linearSearch = function (value) {
  const now = new Date();

  for (let i = 0; i < records; i++) {
    if (value === i) {
      console.log("Linear Search Execution, We found the value: ", i);
      break;
    }
  }
  console.log("Linear Search Execution time in seconds: ", (new Date().getTime() - now.getTime()) / 1000);
};

const binarySearch = function (value) {
  const now = new Date();

  let l = 0, r = records;
  while (l < r) {
    const midpoint = Math.floor((l + r) / 2);
    if (midpoint === value) {
      break;
    }
    if (value < midpoint) {
      r = midpoint - 1;
    } else {
      l = midpoint + 1;
    }
  }
  const midpointAfter = (l + r) / 2;
  if (midpointAfter === value) {
    console.log("Binary Search Execution, We found the value: ", midpointAfter);
  }
  console.log("Binary Search Execution time in seconds: ", (new Date().getTime() - now.getTime()) / 1000);
};

linearSearch(records - 2);
binarySearch(records - 2);