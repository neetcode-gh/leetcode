/**
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 * Time O(N) | Space O(1)
 * @param {number} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let [left, right, max] = [0, 1, 0];

    while (right < prices.length) {
        const canSlide = prices[right] <= prices[left];
        if (canSlide) left = right;

        const window = prices[right] - prices[left];

        max = Math.max(max, window);
        right++;
    }

    return max;
};

/**
 * Another approach without using sliding window
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 * Time O(N) | Space O(1)
 * @param {number} prices
 * @return {number}
 */

var maxProfit = function (prices) {
    let min = prices[0];
    let max = min;
    let value = 0;
    for (let i = 0; i < prices.length; i++) {
        if (i != prices.length - 1 && prices[i] <= min) {
            max = min = prices[i];
        } else if (prices[i] > max) {
            max = prices[i];
        }
        value = max - min > value ? max - min : value;
    }
    return value;
};
