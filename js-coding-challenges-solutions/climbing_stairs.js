/**
 * You are climbing a staircase. It takes n steps to reach the top.
 *
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 */

const climbStairs = (n) => {
  if (n === 1) {
    return n;
  }
  if (n === 2) {
    return n;
  }
  let prevTotal = 1;
  let currTotal = 2;
  for (let i = 3; i < n; i++) {
    let temp = prevTotal + currTotal;
    prevTotal = currTotal;
    currTotal = temp;
  }
  return prevTotal + currTotal;
};

/**
 *
 * @param n
 * @return {number|*}
 * @private
 *
 * originally, the time complexity for this function is O(2^n).
 * Since there's alot of repeated work, i.e. if n was 5, we've already computed for n=4,n=3,n=2,n=1.
 * Therefore, we can skip that. Given this optimization, the time complexity becomes O(n).
 *
 * an Example: if n was 7 = we'll only compute for n=6,n=5 and so on.
 * Therefore, if we started with n as 1, and we cached this result, then when n say became 5, we don't have to start
 *   from 1.
 */
const _climbStairsDP = (n) => {
  let one = 1, two = 1;
  n--;

  while (n) {
    const temp = one;
    one = one + two;
    two = temp;
    n--;
  }
  return one;
};
// console.log(climbStairs(10));
console.log(_climbStairsDP(3));