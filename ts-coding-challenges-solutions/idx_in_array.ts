/**
 * Return number's index in an Array as if the Array was sorted.
 *
 * Given an array input - which can contain duplicates - and given a number target,
 * write a method which return the index/indices (position/s) of the given number in the array,
 * as if the input was sorted.
 */

const returnNumberIdx = (nums: number[], target: number) => {
  let targetCount = 0;
  let lessThanTargetCount = 0;

  for (const n of nums) {
    if (n === target) {
      targetCount++;
    }
    if (n < target) {
      lessThanTargetCount++;
    }
  }

  const indices: number[] = [];
  for (let i = lessThanTargetCount ; i < lessThanTargetCount + targetCount; i++) {
    indices.push(i);
  }

  return indices;
};


console.log(returnNumberIdx([33,22,33,11,22,1,2,3,4,5,6,7,8,9,10,101,10,101,10,10], 10));
console.log(returnNumberIdx([33,22,33,11,22], 22));

console.log([33,22,33,11,22,1,2,3,4,5,6,7,8,9,10,101,10,101,10,10].sort((a,b)=>a-b))