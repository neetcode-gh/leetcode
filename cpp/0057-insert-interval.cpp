/*
    Given array of non-overlapping intervals & a new interval, insert & merge if necessary
    Ex. intervals = [[1,3],[6,9]], newInterval = [2,5] -> [[1,5],[6,9]]

    To merge: while intervals are still overlapping the new one, take the larger bounds

    Time: O(n)
    Space: O(n)
*/

class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> ans;
        int newStart = newInterval[0];
        int newEnd = newInterval[1];
        int n = intervals.size();
        for (int i = 0; i < n; i++) {
            // Case 1: Non overlapping interval
            // If new interval is before the current interval
            if (intervals[i][0] > newEnd) {
                ans.push_back(newInterval);
                copy(intervals.begin() + i, intervals.end(), back_inserter(ans));
                return ans;
            }
            // If new interval is after the current interval
            else if (intervals[i][1] < newStart) {
                ans.push_back(intervals[i]);
            }
            // Case 2: Overlapping interval
            else {
                newInterval[0] = min(newInterval[0], intervals[i][0]);
                newInterval[1] = max(newInterval[1], intervals[i][1]);
            }
        }
        ans.push_back(newInterval);
        return ans;
    }
};
