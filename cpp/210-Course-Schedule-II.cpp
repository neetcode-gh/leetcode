class Solution210 {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<int> res;
        vector<vector<int>> adjList(numCourses, vector<int>());
        vector<int> indegrees(numCourses, 0);

        // make adjacency list as {course: prerequisites} and also fill indegrees
        for (auto pre : prerequisites) {
            adjList[pre[1]].push_back(pre[0]);
            ++indegrees[pre[0]];
        }

        queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (indegrees[i] == 0) // add courses with 0 indegree to queue
                q.push(i);
        }

        while (!q.empty()) {
            // process the course with 0 indegree
            int course = q.front();
            q.pop();
            res.push_back(course);

            for (int next : adjList[course]) {
                // as prerequisite course is processed, decrease the indegree of next course
                --indegrees[next];
                // if indegree become 0, add to queue
                if (indegrees[next] == 0)
                    q.push(next);
            }
            // remove processed course
            adjList[course].clear();
        }

        // if the result contains all nodes, it's posible to finish all course, else, return empty array
        return res.size() == numCourses ? res : vector<int>(0);
    }
};
