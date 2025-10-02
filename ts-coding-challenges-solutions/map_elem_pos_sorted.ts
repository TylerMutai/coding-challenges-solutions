/**
 * Map every element to its position in the array as if it was sorted
 *
 * Now we need to return a new array where every element is mapped to its position in the sorted array.
 */

const mapElemPosSorted = (nums: number[]) => {
  const originalNums = [...nums];
  const sortedArr = nums.sort((a, b) => a - b);

  const mappingToSortedArr = new Map<number, number[]>();
  for (let i = 0; i < sortedArr.length; i++) {
    const mappings = mappingToSortedArr.get(sortedArr[i]) || [];
    mappings.push(i);
    mappingToSortedArr.set(sortedArr[i], mappings);
  }

  const indices: number[] = [];
  for (let i = 0; i < originalNums.length; i++) {
    const mappings = mappingToSortedArr.get(originalNums[i]) || [];
    indices.push(mappings[0]);
    mappings.shift();
    mappingToSortedArr.set(originalNums[i], mappings);
  }

  return indices;
};


console.log(mapElemPosSorted([33, 44, 33, 11, 22]));