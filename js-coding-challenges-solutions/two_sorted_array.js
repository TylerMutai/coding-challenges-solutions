/**
 * Given two sorted arrays, arr1 and arr2, find the median of theses
 * sorted arrays where n is the number of elements
 * in the first array and n is the number of elements in the first array and m is the number of
 *
 */
function getMedian(arr1, arr2) {
  let p1 = 0, p2 = 0;
  const sortedArr = [];

  // Combine both arrays into one sorted array.
  while (p1 < arr1.length || p2 < arr2.length) {
    if (p2 >= arr2.length && p1 >= arr1.length) {
      break;
    }
    if (p2 >= arr2.length) {
      sortedArr.push(arr1[p1]);
      p1 = p1 + 1;
    } else if (p1 >= arr1.length) {
      sortedArr.push(arr2[p2]);
      p2 = p2 + 1;
    } else if (arr1[p1] < arr2[p2]) {
      sortedArr.push(arr1[p1]);
      p1 = p1 + 1;
    } else {
      sortedArr.push(arr2[p2]);
      p2 = p2 + 1;
    }
  }

  // get the median, which is [sortedArr.length/2];
  if (sortedArr.length % 2 === 0) {
    const n = sortedArr.length / 2;
    // even numbers.
    return (sortedArr[n] + sortedArr[n - 1]) / 2;
  }
  return sortedArr[Math.ceil(sortedArr.length / 2)];

}

console.log(getMedian([3, 3, 3, 4, 5, 6, 7, 8], [1, 2, 2, 3, 4, 5]));