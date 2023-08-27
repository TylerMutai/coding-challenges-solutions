/**
 * You are given an m x n integer matrix matrix with the following two properties:
 *
 * Each row is sorted in non-decreasing order.
 * The first integer of each row is greater than the last integer of the previous row.
 * Given an integer target, return true if target is in matrix or false otherwise.
 *
 * You must write a solution in O(log(m * n)) time complexity.
 */

function binarySearch(values, target) {
  // search the sorted array.
  let l = 0, r = values.length - 1;
  while (l <= r) {
    const midpoint = Math.floor((l + r) / 2);
    const value = values[midpoint];

    if (target === value) {
      return true;
    }

    if (target > value) {
      l = midpoint + 1;
    } else {
      r = midpoint - 1;
    }
  }
  return false;
}

function searchMatrix(matrix, target) {
  // convert matrix to a single dimension sorted array
  const values = [];
  for (const row of matrix) {
    for (const val of row) {
      values.push(val);
    }
  }
  return binarySearch(values, target);
}

function _searchMatrix(matrix, target) {
  let r = 0, c = matrix.length - 1;

  while (r <= c) {
    const midpoint = Math.floor((r + c) / 2);
    const row = matrix[midpoint];
    if (target >= row[0] && target <= row[row.length - 1]) {
      return binarySearch(row, target);
    }
    if (target > row[row.length - 1]) {
      r = midpoint + 1;
    } else {
      c = midpoint - 1;
    }
  }
  return false;
}

console.log(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3));
console.log(_searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3));