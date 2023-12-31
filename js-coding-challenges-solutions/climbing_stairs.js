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
    console.log("prevTotal: ", prevTotal);
    console.log("currTotal: ", currTotal);
    console.log("TEMP: ", temp);
  }
  return prevTotal + currTotal;
};

console.log(climbStairs(10));