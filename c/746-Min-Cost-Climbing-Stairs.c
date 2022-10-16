int min(int a, int b) { return a > b ? b : a; }

int minCostClimbingStairs(int *cost, int costSize) {

    for (int i = 2; i < costSize; i++) 
        cost[i] += min(cost[i - 1], cost[i - 2]);

    return min(cost[costSize - 1], cost[costSize - 2]);
}