class Solution {
public:
    int minReorder(int n, vector<vector<int>>& connections) {
        unordered_map<int, vector<pair<int, bool>>> graph;
        unordered_set<int> visited;

        for (int i = 0; i < n; i++)
            graph[i] = vector<pair<int, bool>>{};

        for (vector<int> connection : connections) {
            graph[connection[0]].push_back(make_pair(connection[1], true));
            graph[connection[1]].push_back(make_pair(connection[0], false));
        }

        int cnt = 0;
        stack<int> stk;
        stk.push(0);
        visited.insert(0);

        while (!stk.empty()) {
            int u = stk.top();
            stk.pop();
            for (pair<int, bool> v : graph[u]) {
                if (visited.count(v.first))
                    continue;
                stk.push(v.first);
                visited.insert(v.first);
                if (v.second)
                    cnt += 1;
            }
        }

        return cnt;
    }
};

