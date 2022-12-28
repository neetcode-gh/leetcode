public class Solution {
    public int MinCostClimbingStairs(int[] cost) {
        // return topDown(cost);
        return bottomUp(cost);
    }
    
    private int topDown(int[] cost) {
        var l = cost.Length;        
        
        for(var i = 2; i < l; i ++) {
            cost[i] += Math.Min(cost[i - 1], cost[i - 2]);
        }
        
        return Math.Min(cost[l - 1], cost[l - 2]);
    }
    
    private int bottomUp(int[] cost) {
        
        for(var i = cost.Length - 3; i >= 0; i--) {
            cost[i] += Math.Min(cost[i + 1], cost[i + 2]);
        }
        
        return Math.Min(cost[0], cost[1]);
    }
}