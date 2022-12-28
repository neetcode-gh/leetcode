/*
    Given cities connected by flights [from,to,price], also given src, dst, & k:
    Return cheapest price from src to dst with at most k stops

    Minimized implementation of the Bellman-Ford algorithm.
    Loop for #maximum-stops times and, for each flight, update the array of distances if 
    there's a new path from the destination to the source having lower cost than the current.
    Time: O(k*n)
    Space: O(n)
*/

class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> dist(n, INT_MAX);
        dist[src] = 0;

        for (int stops = 0; stops <= k; ++stops){
            vector<int> tmp = dist;
            for (auto& flight : flights){
                int s = flight[0], d = flight[1], p = flight[2];
                if (dist[s] == INT_MAX)
                    continue;
                if (tmp[d] > dist[s] + p)
                    tmp[d] = dist[s] + p;                
            }
            dist = tmp;
        }

        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};
