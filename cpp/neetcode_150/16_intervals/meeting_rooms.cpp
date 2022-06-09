/*
    Given array of time intervals, determine if can attend all meetings
    Ex. intervals = [[0,30],[5,10],[15,20]] -> false

    Sort by start time, check adj meetings, if overlap return false

    Time: O(n log n)
    Space: O(1)
*/

class Solution {
public:
    bool canAttendMeetings(vector<vector<int>>& intervals) {
        if (intervals.empty()) {
            return true;
        }
        
        sort(intervals.begin(), intervals.end());
        for (int i = 0; i < intervals.size() - 1; i++) {
            if (intervals[i][1] > intervals[i + 1][0]) {
                return false;
            }
        }
        return true;
    }
};
