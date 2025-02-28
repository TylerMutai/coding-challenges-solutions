/**
 * You are given an array of integers stones where stones[i] represents the weight of the ith stone.
 *
 * We want to run a simulation on the stones as follows:
 *
 * At each step we choose the two heaviest stones, with weight x and y and smash them togethers
 * If x == y, both stones are destroyed
 * If x < y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
 * Continue the simulation until there is no more than one stone remaining.
 *
 * Return the weight of the last remaining stone or return 0 if none remain.
 */
const sortAlgAsc = (a: number, b: number) => a - b;
const sortAlgDesc = (a: number, b: number) => b - a;
const sorting = (stones: number[]) => {
  if (stones.length === 0) {
    return null;
  }
  if (stones.length === 1) {
    return stones[0];
  }


  const heap = [...stones].sort(sortAlgDesc);


  let res = -1;
  while (heap.length > 1) {
    const a = heap.shift()!;
    const b = heap.shift()!;

    res = Math.abs(a - b);
    heap.unshift(res);
    heap.sort(sortAlgDesc);
  }

  return res;
};

const binarySearch = (stones: number[]) => {
  if (stones.length === 0) {
    return null;
  }
  if (stones.length === 1) {
    return stones[0];
  }


  let sortedStones = [...stones].sort(sortAlgAsc);

  let res = -1;
  while (sortedStones.length > 1) {
    const a = sortedStones.pop()!;
    const b = sortedStones.pop()!;

    res = Math.abs(a - b);
    let left = 0, right = sortedStones.length - 1;
    while (left < right) {
      // look for a number greater than or equal to res.
      const mid = Math.floor((left + right) / 2);
      if (sortedStones[mid] < res) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // insert at position
    const newSortedArr: number[] = [];
    for (let i = 0; i < sortedStones.length; i++) {
      if (i === left) {
        // insert here
        newSortedArr.push(res);
      }
      newSortedArr.push(sortedStones[i]);
    }
    sortedStones = newSortedArr;
  }
  return res;
};
const lastStoneWeight = (stones: number[]) => {
  // console.log(sorting([...stones]));
  console.log(binarySearch([...stones]));
};

lastStoneWeight([3, 7, 2]);