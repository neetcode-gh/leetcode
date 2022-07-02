/*
    Given cities connected by flights [from,to,price], also given src, dst, & k:
    Return cheapest price from src to dst with at most k stops

    Dijkstra's but modified, normal won't work b/c will discard heap nodes w/o finishing
    Modify: need to re-consider a node if dist from source is shorter than what we recorded
    But, if we encounter node already processed but # of stops from source is lesser,
    Need to add it back to the heap to be considered again

    Time: O(V^2 log V) -> V = number of cities
    Space: O(V^2)
*/

class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        // build adjacency matrix
        vector<vector<int>> adj(n, vector<int>(n));
        for (int i = 0; i < flights.size(); i++) {
            vector<int> flight = flights[i];
            adj[flight[0]][flight[1]] = flight[2];
        }
        
        // shortest distances
        vector<int> distances(n, INT_MAX);
        distances[src] = 0;
        // shortest steps
        vector<int> currStops(n, INT_MAX);
        currStops[src] = 0;
        
        // priority queue -> (cost, node, stops)
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;
        pq.push({0, src, 0});
        
        while (!pq.empty()) {
            int cost = pq.top()[0];
            int node = pq.top()[1];
            int stops = pq.top()[2];
            pq.pop();
            
            // if destination is reached, return cost to get here
            if (node == dst) {
                return cost;
            }
            
            // if no more steps left, continue
            if (stops == k + 1) {
                continue;
            }
            
            // check & relax all neighboring edges
            for (int neighbor = 0; neighbor < n; neighbor++) {
                if (adj[node][neighbor] > 0) {
                    int currCost = cost;
                    int neighborDist = distances[neighbor];
                    int neighborWeight = adj[node][neighbor];
                    
                    // check if better cost
                    int currDist = currCost + neighborWeight;
                    if (currDist < neighborDist || stops + 1 < currStops[neighbor]) {
                        pq.push({currDist, neighbor, stops + 1});
                        distances[neighbor] = currDist;
                        currStops[neighbor] = stops;
                    } else if (stops < currStops[neighbor]) {
                        // check if better steps
                        pq.push({currDist, neighbor, stops + 1});
                    }
                    currStops[neighbor] = stops;
                }
            }
        }
        
        if (distances[dst] == INT_MAX) {
            return -1;
        }
        return distances[dst];
    }
};
