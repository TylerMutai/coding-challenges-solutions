/**
 * Design a class to find the kth largest integer in a stream of values, including duplicates. E.g. the 2nd largest
 * from [1, 2, 3, 3] is 3. The stream is not necessarily sorted.
 *
 * Implement the following methods:
 *
 * constructor(int k, int[] nums) Initializes the object given an integer k and the stream of integers nums.
 * int add(int val) Adds the integer val to the stream and returns the kth largest integer in the stream.
 */

class KthLargest {
  private priorityHeap: number[];
  private readonly k: number;

  constructor(k: number, nums: number[]) {
    this.priorityHeap = nums.sort((a, b) => b - a);
    this.k = k;
  }

  add(num: number) {
    this.priorityHeap.push(num);
    this.priorityHeap.sort((a, b) => b - a);
    return this.priorityHeap.find((_, i) => i === this.k - 1);
  }
}


const kthLargest = new KthLargest(1, []);
console.log(kthLargest.add(3));
console.log(kthLargest.add(-2));
console.log(kthLargest.add(5));
console.log(kthLargest.add(10));
console.log(kthLargest.add(9));