public class Solution
{
    public int MinCostClimbingStairs(int[] cost)
    {
        int[] minCost = new int[cost.Length + 1];
        minCost[minCost.Length - 1] = 0;
        minCost[minCost.Length - 2] = cost[cost.Length - 1];

        for (var i = minCost.Length - 3; i >= 0; i--)
        {
            var oneStep = cost[i] + minCost[i + 1];
            var twoStep = cost[i] + minCost[i + 2];
            minCost[i] = Math.Min(oneStep, twoStep);
        }
        return Math.Min(minCost[0], minCost[1]);
    }
}