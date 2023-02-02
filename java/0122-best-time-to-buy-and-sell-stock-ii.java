class Solution {
    public int maxProfit(int[] prices) {
        int oldStockPrice = prices[0];
        int profit = 0;
        for(int i = 1; i<prices.length; i++){
            if(prices[i]<oldStockPrice){
                oldStockPrice = prices[i];
            }else{
                profit+=prices[i]-oldStockPrice;
                oldStockPrice = prices[i];
            }
        }
        return profit;
    }
}
