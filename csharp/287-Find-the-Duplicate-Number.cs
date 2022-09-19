public class Solution {
    public int FindDuplicate(int[] nums) {
        return floydAlgorithm(nums);
        // return arrayAsHashMapIterative(nums);
    }
    
    private int floydAlgorithm(int[] nums) {
        int slow = 0, fast = 0;
        
        while(true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow == fast)
                break;
        }
        
        var slow2 = 0;
        
        while(true) {
            slow = nums[slow];
            slow2 = nums[slow2];
            if (slow == slow2)
                return slow;
        }
        
        return 0;
    }
    
    private int arrayAsHashMapIterative(int[] nums) {
        while(nums[0] != nums[nums[0]]) {
            int nxt = nums[nums[0]];
            nums[nums[0]] = nums[0];
            nums[0] = nxt;
        }
        
        return nums[0];
    }
}