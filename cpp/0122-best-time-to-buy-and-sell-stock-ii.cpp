 /*
    Approach: 
    If stock price is going up tomorrow just buy it today and sell it tomorrow.
    
    Time complexity : O(n)
    Space complexity: O(1)

    n is number of days.
*/

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int ans =0;
        
        // look into the next day and if you are making profit just buy it today.
        for(int i =1;i<prices.size();i++){
            if(prices[i]>prices[i-1]) ans += (prices[i]-prices[i-1]);
        }
        return ans;
    }
};