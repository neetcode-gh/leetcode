public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        var lookup = new Dictionary<int, int>();
        
        for (int i = 0; i < nums.Length; i++) 
        {
            int complement = target - nums[i];
            
            if (lookup.ContainsKey(complement))
                return new int[] {lookup[complement], i};
            else
                lookup[nums[i]] = i;
        }
        
        return new int[] {-1,-1};
    }
}