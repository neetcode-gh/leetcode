class Solution {
public:
    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start_node, int end_node) {
        // adj list mapping {node -> [(probability, neighborNode), ...]}
        unordered_map<int, vector<pair<double, int>>> adj;
        for (int i=0; i<edges.size(); ++i) {
            vector<int> edge = edges[i];
            adj[edge[0]].push_back({succProb[i], edge[1]});
            adj[edge[1]].push_back({succProb[i], edge[0]});
        }

        // maxHeap storing pairs of (probability, node)
        priority_queue<pair<double, int>> pq; 
        pq.push({1.0, start_node});

        unordered_set<int> visited;

        // applying Dijkstra's algorithm
        while (!pq.empty()) {
            double currProb = pq.top().first;
            int currNode = pq.top().second;
            pq.pop();

            if (currNode == end_node)
                return currProb;

            visited.insert(currNode);

            for (auto& [nextProb, nextNode] : adj[currNode]) {
                if (visited.find(nextNode) == visited.end()) {
                    pq.push({currProb*nextProb, nextNode});
                }
            }
        }   

        return 0.0;
    }
};