/*
    Gas stations along circular route, return where to start to complete 1 trip
    Ex. gas = [1,2,3,4,5] cost = [3,4,5,1,2] -> index 3 (station 4), tank = 4,8,7,6,5

    At a start station, if total ever becomes negative won't work, try next station

    Time: O(n)
    Space: O(1)
*/

class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int n = gas.size();
        
        int totalGas = 0;
        int totalCost = 0;
        for (int i = 0; i < n; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
        }
        if (totalGas < totalCost) {
            return -1;
        }
        
        int total = 0;
        int result = 0;
        
        for (int i = 0; i < n; i++) {
            total += gas[i] - cost[i];
            if (total < 0) {
                total = 0;
                result = i + 1;
            }
        }
        
        return result;
    }
};
