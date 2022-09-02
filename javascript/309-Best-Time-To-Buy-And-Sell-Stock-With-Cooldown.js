/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let dp = {} // key=[i, buying] val=max_profit
    
    const dfs = (i, buying) => {
        if (i >= prices.length) return 0
        if (dp[[i, buying]]) return dp[[i, buying]]
        
        const cooldown = dfs(i + 1, buying)
        if (buying) {
            const buy = dfs(i + 1, !buying) - prices[i]
            dp[[i, buying]] = Math.max(buy, cooldown)
        }
        else {
            sell = dfs(i + 2, !buying) + prices[i]
            dp[[i, buying]] = Math.max(sell, cooldown)
        }
        return dp[[i, buying]]
    }
    
    return dfs(0, true)
};

