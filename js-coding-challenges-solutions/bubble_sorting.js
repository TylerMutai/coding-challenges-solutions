/**
 * Bubble Sorting Implementation (Big O(n*n)
 */

function bubbleSort(arr) {
  while (true) {
    let swaps = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        const temp = arr[i - 1];
        arr[i - 1] = arr[i];
        arr[i] = temp;
        swaps++;
      }
    }
    console.log("CURRENT TOTAL SWAPS: ", swaps);
    if (swaps === 0) {
      break;
    }
  }
  return arr;
}

console.log("SORTED ARR: ", bubbleSort(
  [
    10, 29, 1, 2, 3, 99, 11, 5, 3
  ]
))