/**
 * Knapsack Problem
 *
 * You are given a set of items, each item has 2 attributes:
 * a weight and a value. you are also given a capacity which is the maximum weight that your bag can hold.
 * Write a method to return the maximum value you can put in the bag without exceeding the capacity.
 */

interface Item {
  weight: number,
  value: number
}

const knapsackProblem = (items: Item[], capacity: number) => {

  const findMaxValue = (items: Item[], capacity: number, index: number): number => {
    if (index >= items.length) {
      return 0;
    }
    const item = items[index];
    const value = item.value + findMaxValue(items, capacity - item.weight, index + 1);
    return Math.max(value, findMaxValue(items, capacity, index + 1));
  };

  return findMaxValue(items, capacity, 0);
};

console.log(knapsackProblem([
  {
    weight: 2, value: 3,
  },
  {
    weight: 3, value: 5,
  },
  {
    weight: 2, value: 3,
  },
], 4));