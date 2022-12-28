function maxProfit(prices: number[]): number {
    let [ sold, hold, rest ] = [ 0, Number.MIN_SAFE_INTEGER, 0];

    for (let i = 0; i < prices.length; i++) {
        let prevSold = sold;
        sold = hold + prices[i];
        hold = Math.max(hold, rest - prices[i]);
        rest = Math.max(rest, prevSold);
    }
    return Math.max(sold, rest);
};