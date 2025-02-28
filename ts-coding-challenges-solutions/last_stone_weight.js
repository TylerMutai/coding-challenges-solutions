var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
var sortAlgAsc = function (a, b) { return a - b; };
var sortAlgDesc = function (a, b) { return b - a; };
var sorting = function (stones) {
    if (stones.length === 0) {
        return null;
    }
    if (stones.length === 1) {
        return stones[0];
    }
    var heap = __spreadArray([], stones, true).sort(sortAlgDesc);
    var res = -1;
    while (heap.length > 1) {
        var a = heap.shift();
        var b = heap.shift();
        res = Math.abs(a - b);
        heap.unshift(res);
        heap.sort(sortAlgDesc);
    }
    return res;
};
var binarySearch = function (stones) {
    if (stones.length === 0) {
        return null;
    }
    if (stones.length === 1) {
        return stones[0];
    }
    var sortedStones = __spreadArray([], stones, true).sort(sortAlgAsc);
    var res = -1;
    while (sortedStones.length > 1) {
        var a = sortedStones.pop();
        var b = sortedStones.pop();
        res = Math.abs(a - b);
        var left = 0, right = sortedStones.length - 1;
        while (left < right) {
            // look for a number greater than or equal to res.
            var mid = Math.floor((left + right) / 2);
            if (sortedStones[mid] < res) {
                left = mid + 1;
            }
            else {
                right = mid;
            }
        }
        // insert at position
        var newSortedArr = [];
        for (var i = 0; i < sortedStones.length; i++) {
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
var lastStoneWeight = function (stones) {
    // console.log(sorting([...stones]));
    console.log(binarySearch(__spreadArray([], stones, true)));
};
lastStoneWeight([3, 7, 2]);
