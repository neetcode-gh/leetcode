/*
The days of the year in which you will travel are given as an integer array days. Each day is an integer from 1 to 365.

Train tickets are sold in three different ways:

a 1-day pass is sold for costs[0] dollars,
a 7-day pass is sold for costs[1] dollars, and
a 30-day pass is sold for costs[2] dollars.
The passes allow that many days of consecutive travel.

Return the minimum number of dollars you need to travel every day in the given list of days.


Example. For days = [1,4,6,7,8,20] and costs = [2,7,15] we can buy a 1-day pass
	 for costs[0] = $2, which covers day 1. On day 3 we can buy a 7-day pass
	 for costs[1] = $7, which covers days 3,4....9. On day 20 we can again buy a
	 1-day pass for costs[0] = $2 that will cover the 20th day. So in total we spent
	 2 + 7 + 2 = $11 which is the minimum dollars needed for travelling in this case.


Time: O(n)
Space: O(n)

*/


class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {

    vector<int> dp(days.size() + 1, 1e9);
    dp[days.size()] = 0;
    for(int i=days.size()-1; i>=0; i--) {
        for(int j=0; j<3; j++) {
            if(j == 0) {
                auto it = lower_bound(days.begin()+i, days.end(), days[i]+1);
                dp[i] = min(dp[i], costs[j] + dp[it-days.begin()]);
            }
            else if(j == 1) {
                auto it = lower_bound(days.begin()+i, days.end(), days[i]+7);
                dp[i] = min(dp[i], costs[j] + dp[it-days.begin()]);
            } else {
                auto it = lower_bound(days.begin()+i, days.end(), days[i]+30);
                dp[i] = min(dp[i], costs[j] + dp[it-days.begin()]);
            }
        }
    }
    return dp[0];

    }
};