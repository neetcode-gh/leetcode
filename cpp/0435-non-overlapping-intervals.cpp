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
        sort(intervals.begin(), intervals.end());
        int prevEnd = intervals[0][1];
        int count = 0;
        for (int i = 1; i < intervals.size(); i++) {
            if (prevEnd > intervals[i][0]) {
                count++;
                prevEnd = min(prevEnd, intervals[i][1]);
            } else {
                prevEnd = intervals[i][1];
            }
        }
        return count;
    }
};
