class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        // sort by start position
        sort(intervals.begin(), intervals.end());
        int res = 0;
        int lastEnd = intervals[0][1];
        for (int i = 1; i < intervals.size(); ++i) {
            // current interval
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start >= lastEnd) // non-overlap
                lastEnd = end;
            else {
                // overlap: erase and leave the one ends first
                ++res;
                lastEnd = min(end, lastEnd);
            }
        }
        return res;
    }
};
