class Solution207 {
public:
    bool solve(int idx, vector<vector<int>>& adjList, vector<bool>& visited) {
        if (visited[idx]) // already visited in search: cycle exists, cannot finish
            return false;
        if (adjList[idx].size() == 0) // no prerequisites, can finish
            return true;
        visited[idx] = true;
        for (int i = 0; i < adjList[idx].size(); ++i) {
            int next = adjList[idx][i];
            if (!solve(next, adjList, visited))
                return false;
        }
        visited[idx] = false;
        // prevent checking this course again
        adjList[idx].clear();
        return true;
    }

    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        bool result;

        // make adjacency list as {course: prerequisites}
        vector<vector<int>> adjList(numCourses, vector<int>());
        for (auto pre : prerequisites) {
            adjList[pre[1]].push_back(pre[0]);
        }

        vector<bool> visited(numCourses, false);
        for (int i = 0; i < numCourses; ++i) {
            if (!solve(i, adjList, visited))
                return false;
        }
        return true;
    }
};
