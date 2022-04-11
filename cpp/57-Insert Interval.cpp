class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        for (auto it = intervals.cbegin(); it != intervals.cend(); ++it) {
            auto curInterval = *it;
            if (newInterval[1] < curInterval[0]) {
                // every intervals from here comes after newInterval, so just append all
                res.push_back(newInterval);
                res.insert(res.end(), it, intervals.cend());
                return res;
            }
            else if (newInterval[0] > curInterval[1]) {
                // curInterval comes before newInterval
                res.push_back(curInterval);
            }
            else {
                // overlap: merge into newInterval
                newInterval[0] = min(newInterval[0], curInterval[0]);
                newInterval[1] = max(newInterval[1], curInterval[1]);
            }
        }
        res.push_back(newInterval);
        return res;
    }
};
