/**
 * Design a class to find the kth largest integer in a stream of values, including duplicates. E.g. the 2nd largest
 * from [1, 2, 3, 3] is 3. The stream is not necessarily sorted.
 *
 * Implement the following methods:
 *
 * constructor(int k, int[] nums) Initializes the object given an integer k and the stream of integers nums.
 * int add(int val) Adds the integer val to the stream and returns the kth largest integer in the stream.
 */
var KthLargest = /** @class */ (function () {
    function KthLargest(k, nums) {
        var _n = nums.sort(function (a, b) { return b - a; });
        // remove all elements we don't need
        while (_n.length > k) {
            _n.pop();
        }
        this.priorityHeap = _n;
        this.k = k;
    }
    KthLargest.prototype.add = function (num) {
        this.priorityHeap.push(num);
        this.priorityHeap.sort(function (a, b) { return b - a; });
        while (this.priorityHeap.length > this.k) {
            this.priorityHeap.pop();
        }
        if (this.priorityHeap.length < this.k) {
            return undefined;
        }
        return this.priorityHeap[this.priorityHeap.length - 1];
    };
    return KthLargest;
}());
/*const kthLargest = new KthLargest(1, []);
console.log(kthLargest.add(3));
console.log(kthLargest.add(-2));
console.log(kthLargest.add(5));
console.log(kthLargest.add(10));
console.log(kthLargest.add(9));*/
var kthLargest = new KthLargest(3, [1, 2, 3, 3]);
console.log(kthLargest.add(3)); // return 3
console.log(kthLargest.add(5)); // return 3
console.log(kthLargest.add(6)); // return 3
console.log(kthLargest.add(7)); // return 5
console.log(kthLargest.add(8)); // return 6
