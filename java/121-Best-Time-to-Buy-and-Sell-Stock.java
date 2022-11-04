class Solution {
    public int maxProfit(int[] prices) {
        int profit = 0;
        int oldStockPrice = prices[0];
        for(int i = 1; i<prices.length; i++){
            if(prices[i] > oldStockPrice ){
                //sell the stock
                profit = Math.max(profit, prices[i]-oldStockPrice );
            }else{
                //buy
                oldStockPrice = prices[i];
            }
        }
        return profit;
    }
}
