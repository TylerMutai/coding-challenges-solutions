/**
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 *
 * You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
 *
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
 *
 */

function maxProfit(prices) {
  let l = 0, r = 1;
  let _maxProfit = 0;
  while (r < prices.length) {
    const diff = prices[r] - prices[l];
    _maxProfit = Math.max(_maxProfit, diff);
    if (prices[l] > prices[r]) {
      // we want to buy low, and sell high.
      // we therefore move our left pointer.
      l++;

      // if we're at the same position with r, move r also forward.
      if (l === r) {
        r++;
      }
    } else {
      r++;
    }
  }
  return _maxProfit;
}

function _maxProfit(prices){
  // [1,2,3,0,2]
  // sell + buy + sell + buy = 2 sells, 2 buys
  // sell + sell + sell + sell - 4 sells
  // buy + buy + buy + buy - 4 buys
  // sell + buy + sell + buy + sell = 3 sells, 2 buys
  // buy + sell + buy + sell = 2 buys, 2 sells
  // buy + sell + buy + sell + buy = 3 buys, 2 sells
  // So scenarios are:
  // 1. sell, then buy

}

console.log(maxProfit([7,1,5,3,6,4]))