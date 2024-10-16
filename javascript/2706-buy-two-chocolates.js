/**
 * Greedy | Array
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/buy-two-chocolates
 * @param {number[]} prices
 * @param {number} money
 * @return {number}
 */
var buyChoco = function(prices, money) {
    
    const [cheapestChocolate] = prices.splice(prices.indexOf(Math.min(...prices)), 1);
    const [secondCheapestChocolate] = prices.splice(prices.indexOf(Math.min(...prices)), 1);
    const leftOverMoney = money - (cheapestChocolate + secondCheapestChocolate);
    return leftOverMoney > -1 ? leftOverMoney : money; 
};
