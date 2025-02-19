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
        this.priorityHeap = nums.sort(function (a, b) { return b - a; });
        this.k = k;
    }
    KthLargest.prototype.add = function (num) {
        var idx = 0;
        for (var i = 0; i < this.priorityHeap.length; i += 1) {
            if (num > this.priorityHeap[i]) {
                idx = i;
                break;
            }
        }
        var newArr = [];
        for (var count = 0; count < this.priorityHeap.length; count++) {
            if (count === idx) {
                newArr.push(num);
            }
            newArr.push(this.priorityHeap[count]);
        }
        this.priorityHeap = newArr;
        console.log("heap: ", this.priorityHeap);
        for (var i = 0; i < this.priorityHeap.length; i++) {
            if (i === this.k) {
                return this.priorityHeap[i];
            }
        }
        return this.priorityHeap[0];
    };
    return KthLargest;
}());
var kthLargest = new KthLargest(3, [1, 2, 3, 4, 5]);
kthLargest.add(3);
kthLargest.add(3);
kthLargest.add(3);
kthLargest.add(5);
