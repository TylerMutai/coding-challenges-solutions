/**
 * An implementation of selection sort. Has a Big O(n*n)
 */

function selectionSort(arr) {
  let currentStart = 0;
  while (currentStart < arr.length) {
    let smallestElem = arr[currentStart], index = currentStart;
    for (let i = currentStart + 1; i < arr.length; i++) {
      if (arr[i] < smallestElem) {
        smallestElem = arr[i];
        index = i;
      }
    }

    // we have the smallest element. do swap.
    const temp = arr[currentStart];
    arr[currentStart] = smallestElem;
    arr[index] = temp;
    currentStart++;
  }
  return arr;
}

console.log("SORTED ARR: ", selectionSort(
  [
    10, 29, 1, 2, 3, 99, 11, 5, 3, 500, 0, 499, 488, 477, 466, 455, 444, 443, 442, 441
  ]
))