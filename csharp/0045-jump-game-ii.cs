public class Solution {
    public int Jump(int[] nums) {
        int left = 0, right = 0, res = 0;
        
        while (right < nums.Length - 1) {
            int maxJump = 0;
            for (int i = left; i <= right; i++) {
                maxJump = Math.Max(maxJump, i + nums[i]);
            }
            left = right + 1;
            right = maxJump;
            res++;
        }
        return res;
    }
}