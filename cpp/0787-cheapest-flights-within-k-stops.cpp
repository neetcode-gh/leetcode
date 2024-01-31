class Solution {
public:
    /**
     * This function uses the Bellman-Ford algorithm to find the cheapest price from source (src) to destination (dst)
     * with at most k stops allowed. It iteratively relaxes the edges for k+1 iterations, updating the minimum
     * cost to reach each vertex. The final result is the minimum cost to reach the destination, or -1 if the
     * destination is not reachable within the given constraints.
     * 
     * Space Complexity: O(n) - space used for the prices array.
     * Time Complexity: O(k * |flights|) - k iterations, processing all flights in each iteration.
     */
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> prices(n, INT_MAX);
        prices[src] = 0;

        // Perform k+1 iterations of Bellman-Ford algorithm.
        for (int i = 0; i < k + 1; i++) {
            vector<int> tmpPrices(begin(prices), end(prices));

            for (auto it : flights) {
                int s = it[0];
                int d = it[1];
                int p = it[2];

                if (prices[s] == INT_MAX) continue;

                if (prices[s] + p < tmpPrices[d]) {
                    tmpPrices[d] = prices[s] + p;
                }
            }
            prices = tmpPrices;
        }
        return prices[dst] == INT_MAX ? -1 : prices[dst];
    }
};
