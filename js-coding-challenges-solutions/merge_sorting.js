/**
 * An implementation of merge sort. Has a Big O(n log n)
 */

function mergeSort(arr) {
  // edge case.
  if (arr.length === 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);

  const leftHalf = [];
  for (let i = 0; i < mid; i++) {
    leftHalf.push(arr[i]);
  }
  const rightHalf = [];
  for (let i = mid; i < arr.length; i++) {
    rightHalf.push(arr[i]);
  }

  const leftSortedArr = mergeSort(leftHalf);
  const rightSortedArr = mergeSort(rightHalf);

  const sortedArr = [];
  let l = 0, r = 0;
  while (l < leftSortedArr.length && r < rightSortedArr.length) {
    if (leftSortedArr[l] < rightSortedArr[r]) {
      sortedArr.push(leftSortedArr[l]);
      l++;
    } else {
      sortedArr.push(rightSortedArr[r]);
      r++;
    }
  }

  // insert remaining items.
  if (l < leftSortedArr.length) {
    for (let i = l; i < leftSortedArr.length; i++) {
      sortedArr.push(leftSortedArr[i]);
    }
  }

  if (r < rightSortedArr.length) {
    for (let i = r; i < rightSortedArr.length; i++) {
      sortedArr.push(rightSortedArr[i]);
    }
  }

  return sortedArr;
}

console.log("SORTED ARR: ", mergeSort(
  [
    10, 29, 1, 2, 3, 99, 11, 5, 3, 500, 0, 499, 488, 477, 466, 455, 444,
    443, 442, 441, 1000, 999, 998, 997, 996, 995, 994, 993, 992, 991
  ]
))