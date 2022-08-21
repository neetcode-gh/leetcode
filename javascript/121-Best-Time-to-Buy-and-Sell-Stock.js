/**
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 * Time O(N) | Space O(1)
 * @param {number} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let [ left, right, max ] = [ 0, 1, 0];

    while (right < prices.length) {
        const canSlide = prices[right] <= prices[left];
        if (canSlide) left = right;

        const window = prices[right] - prices[left];

        max = Math.max(max, window);
        right++;
    }

    return max;
}