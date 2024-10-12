class Solution {
public:
    int minCost(string colors, vector<int>& neededTime) {
        int left = 0, time = 0;
        for (int right = 1; right < colors.size(); ++right) {
            if (colors[left] == colors[right]) {
                if (neededTime[left] < neededTime[right]) {
                    time += neededTime[left];
                    left = right;
                } 
                else {
                    time += neededTime[right];
                }
            } 
            else {
                left = right;
            }
        }
        return time;
    }
};
