/*
You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
Find and return the maximum profit you can achieve.

Time: O(n)
Space: O(1)
*/

int maxProfit(int* prices, int pricesSize){
    int profit = 0; // All profit made
    for (int i=1; i<pricesSize; i++)
        if (prices[i-1]<prices[i])// Only one day buy and sell
            profit += prices[i]-prices[i-1];
    return profit;
}
