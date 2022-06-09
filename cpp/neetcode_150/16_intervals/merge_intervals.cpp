/*
    Given an array of intervals, merge all overlapping intervals
    Ex. intervals = [[1,3],[2,6],[8,10],[15,18]] -> [[1,6],[8,10],[15,18]]

    Sort by earliest start time, merge overlapping intervals (take longer end time)

    Time: O(n log n)
    Space: O(n)
*/

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        int n = intervals.size();
        if (n == 1) {
            return intervals;
        }
        
        sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {
           return a[0] < b[0]; 
        });
        
        vector<vector<int>> result;
        
        int i = 0;
        while (i < n - 1) {
            if (intervals[i][1] >= intervals[i+1][0]) {
                intervals[i+1][0] = intervals[i][0];
                intervals[i+1][1] = max(intervals[i][1], intervals[i+1][1]);
            } else {
                result.push_back(intervals[i]);
            }
            i++;
        }
        result.push_back(intervals[i]);
        
        return result;
    }
};
