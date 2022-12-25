/*
    Array of stock prices, find max profit
    After a sell cooldown of 1 day, can't engage in multiple transactions
    Ex. prices = [1,2,3,0,2] -> 3, transactions = [buy,sell,cd,buy,sell]

    DP + state machine: held ---> sold ---> reset ---> held
                             sell      rest       buy

    Time: O(n)
    Space: O(n)
*/

// class Solution {
// public:
//     int maxProfit(vector<int>& prices) {
//         int n = prices.size();
//         vector<int> s0(n, 0);
//         vector<int> s1(n, 0);
//         vector<int> s2(n, 0);
//         s0[0] = 0;
//         s1[0] = -prices[0];
//         s2[0] = INT_MIN;
//         for (int i = 1; i < n; i++) {
//             s0[i] = max(s0[i - 1], s2[i - 1]);
//             s1[i] = max(s1[i - 1], s0[i - 1] - prices[i]);
//             s2[i] = s1[i - 1] + prices[i];
//         }
//         return max(s0[n - 1], s2[n - 1]);
//     }
// };
//
// Optimized solution with O(1) space follows
/*
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int sold = 0;
        int hold = INT_MIN;
        int rest = 0;
        
        for (int i = 0; i < prices.size(); i++) {
            int prevSold = sold;
            sold = hold + prices[i];
            hold = max(hold, rest - prices[i]);
            rest = max(rest, prevSold);
        }
        
        return max(sold, rest);
    }
};
*/

// NeetCode's solution
// Uses an array of arrays of size two (i.e. a n x 2 matrix)
// representing at position 0 of each row the "selling" value
// whereas at position 1 the "buying" value.
// Could've used a map<pair<int,int>> instead of the bidimensional
// array at the expense of logn search.
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        vector<vector<int>> DP(prices.size(), vector<int>(2, -1));
        return dfs(prices, DP, 0, 1);
    }

private:
    int dfs(vector<int>& prices, vector<vector<int>>& DP, int i, int buying){
        if (i >= prices.size())
            return 0;
        if (DP[i][buying] != -1)
            return DP[i][buying];
        
        int cooldown = dfs(prices, DP, i+1, buying);
        if (buying){
            int buy = dfs(prices, DP, i+1, 0) - prices[i];
            DP[i][buying] = max(buy, cooldown);
        } else {
            int sell = dfs(prices, DP, i+2, 1) + prices[i];
            DP[i][buying] = max(sell, cooldown);
        }

        return DP[i][buying];
    }
};
