/*
    Array of stock prices, find max profit
    After a sell cooldown of 1 day, can't engage in multiple transactions
    Ex. prices = [1,2,3,0,2] -> 3, transactions = [buy,sell,cd,buy,sell]

    DP + state machine: held ---> sold ---> reset ---> held
                             sell      rest       buy

    Time: O(n)
    Space: O(1) -> optimized from O(n) since only need i - 1 prev state
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
