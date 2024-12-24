/**
 * You are given an array of integers stones where stones[i] is the weight of the ith stone.
 *
 * We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together.
 * Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:
 *
 * If x == y, both stones are destroyed, and
 * If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
 * At the end of the game, there is at most one stone left.
 *
 * Return the weight of the last remaining stone. If there are no stones left, return 0.
 */

function reduceArray(arr, val) {
  const newArr = [];
  if(val === 0){
    for (let i = 2; i < arr.length; i++) {
      newArr.push(arr[i]);
    }
    return newArr;
  }

  newArr.push(val);
  for (let i = 2; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  newArr.sort((a, b) => b - a);
  return newArr;
}

function lastStoneWeight(stones) {
  let n = 1;

  stones.sort((a, b) => b - a);
  console.log("stonesSorted: ", stones);

  let runningArr = [...stones];
  while (runningArr.length > 1) {
    runningArr = reduceArray(runningArr, Math.abs(runningArr[0] - runningArr[1]));
  }

  return runningArr.length ? runningArr[0] : 0;
}

console.log(lastStoneWeight([7, 6, 7, 6, 9]));