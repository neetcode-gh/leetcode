/*
    Given intervals array & queries array, ans to a query is min interval containing it
    Ex. intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5] -> [3,3,1,4]

    Min heap & sort by size of intervals, top will be min size, 

    Time: O(n log n + q log q) -> n = number of intervals, q = number of queries
    Space: O(n + q)
*/

class Solution {
public:
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        vector<int> sortedQueries = queries;
        
        // [size of interval, end of interval]
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        // {query -> size of interval}
        unordered_map<int, int> m;
        
        // also need only valid intervals so sort by start time & sort queries
        sort(intervals.begin(), intervals.end());
        sort(sortedQueries.begin(), sortedQueries.end());
        
        vector<int> result;
        
        int i = 0;
        for (int j = 0; j < sortedQueries.size(); j++) {
            int query = sortedQueries[j];
            
            while (i < intervals.size() && intervals[i][0] <= query) {
                int left = intervals[i][0];
                int right = intervals[i][1];
                pq.push({right - left + 1, right});
                i++;
            }
            
            while (!pq.empty() && pq.top().second < query) {
                pq.pop();
            }
            
            if (!pq.empty()) {
                m[query] = pq.top().first;
            } else {
                m[query] = -1;
            }
        }
        
        for (int j = 0; j < queries.size(); j++) {
            result.push_back(m[queries[j]]);
        }
        return result;
    }
};
