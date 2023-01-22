/*
    Given array of intervals, return min # of intervals to remove for all non-overlapping
    Ex. intervals = [[1,2],[1,3],[2,3],[3,4]] -> 1, remove [1,3] for all non-overlapping

    Remove interval w/ longer end point, since will always overlap more or = vs shorter one

    Time: O(n log n)
    Space: O(1)
*/

class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        int n = intervals.size();
        if (n == 1) {
            return 0;
        }
        
        sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {
            return a[0] < b[0];
        });
        
        int result = 0;
        
        int i = 0;
        while (i < n - 1) {
            if (intervals[i][1] > intervals[i+1][0]) {
                if (intervals[i][1] < intervals[i+1][1]) {
                    intervals[i+1] = intervals[i];
                }
                result++;
            }
            i++;
        }
        
        return result;
    }
};
