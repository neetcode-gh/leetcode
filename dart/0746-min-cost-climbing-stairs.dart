class Solution {
  int minCostClimbingStairs(List<int> cost) {
    for (int i = cost.length - 3; i >= 0; i--) {
      cost[i] += min(cost[i + 1], cost[i + 2]);
    }

    return min(cost[0], cost[1]);
  }
}
