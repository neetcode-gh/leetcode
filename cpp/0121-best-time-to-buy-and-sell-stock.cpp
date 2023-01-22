/*
    Given array prices, return max profit w/ 1 buy & 1 sell
    Ex. prices = [7,1,5,3,6,4] -> 5 (buy at $1, sell at $6)

    For each, get diff b/w that & min value before, store max

    Time: O(n)
    Space: O(1)
*/

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int maxP = 0, l = 0, r = 0;
        while (r < prices.size()){
            if (prices[r] > prices[l])
                maxP = max(maxP, prices[r] - prices[l]);
            else
                l = r;
            ++r;
        }
        return maxP;
    }
};
