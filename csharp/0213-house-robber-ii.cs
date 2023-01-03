public class Solution {
    public int Rob(int[] nums) {
        
        return Math.Max(nums[0], Mat
            getMaxRobAmount(nums, 0, nums.Length - 1), 
            getMaxRobAmount(nums, 1, nums.Length)
        );
    }
    
    public int getMaxRobAmount(int[] nums, int start, int end) {
        int rob1 = 0, rob2 = 0;
        
        for(int i = start; i < end; i++) {
            int temp = Math.Max(nums[i] + rob1, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        
        return rob2;
    }
}