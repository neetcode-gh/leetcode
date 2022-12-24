/*
    Graph of nodes, list of edges, determine if edges make valid tree
    Ex. n = 5, edges = [[0,1],[0,2],[0,3],[1,4]] -> true

    (1) For graph to be a valid tree, must have exactly n - 1 edges
    (2) If graph fully connected & has n - 1 edges, can't contain cycle

    Time: O(n)
    Space: O(n)
*/

/*
class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (int i = 0; i < edges.size(); i++) {
            vector<int> edge = edges[i];
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }
        
        vector<bool> visited(n);
        if (hasCycle(adj, visited, -1, 0)) {
            return false;
        }
        
        for (int i = 0; i < visited.size(); i++) {
            if (!visited[i]) {
                return false;
            }
        }
        return true;
    }
private:
    bool hasCycle(vector<vector<int>>& adj, vector<bool>& visited, int parent, int child) {
        if (visited[child]) {
            return true;
        }
        visited[child] = true;
        // checking for cycles and connectedness
        for (int i = 0; i < adj[child].size(); i++) {
            int curr = adj[child][i];
            if (curr != parent && hasCycle(adj, visited, child, curr)) {
                return true;
            }
        }
        return false;
    }
};
*/

class Solution {
public:
    bool validTree(int n, vector<vector<int>> &edges) {
        if (!n)
            return false;
        
        unordered_map<int, vector<int>> adj;
        unordered_set<int> visited;

        for (auto& edge : edges){
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        return dfs(0, -1, adj, visited) && visited.size() == n;
    }
private:
    bool dfs(int i, int prev, unordered_map<int, vector<int>>& adj, unordered_set<int>& visited){
        if (visited.find(i) != visited.end())
            return false;
        
        visited.insert(i);
        for (int& n : adj[i]){
            if (n == prev)
                continue;
            if (!dfs(n, i, adj, visited))
                return false;
        }

        return true;
    }
};
