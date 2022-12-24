/*
    Given array of temps, return an array w/ # of days until warmer
    Ex. temperature = [73,74,75,71,69,72,76,73] -> [1,1,4,2,1,1,0,0]

    Monotonic decr stack, at each day, compare incr from prev days

    Time: O(n)
    Space: O(n)
*/

class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        
        // pair: [index, temp]
        stack<pair<int, int>> stk;
        vector<int> result(n);
        
        for (int i = 0; i < n; i++) {
            int currDay = i;
            int currTemp = temperatures[i];
            
            while (!stk.empty() && stk.top().second < currTemp) {
                int prevDay = stk.top().first;
                int prevTemp = stk.top().second;
                stk.pop();
                
                result[prevDay] = currDay - prevDay;
            }
            
            stk.push({currDay, currTemp});
        }
        
        return result;
    }
};
