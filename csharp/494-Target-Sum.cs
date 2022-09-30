public class Solution {
    public int FindTargetSumWays(int[] nums, int target) {
        var mem = new Dictionary<(int, int), int>();
        
        int dfs(int index, int total){
            if(index == nums.Length)
                return total == target ? 1: 0;
            
            
            if(mem.ContainsKey((index, total))){
                return mem[(index, total)];
            }
            
            mem[(index, total)] = dfs(index+1, total+nums[index]) + dfs(index+1, total-nums[index]);
            return mem[(index, total)];
        }
        
        return dfs(0,0);
    }
}