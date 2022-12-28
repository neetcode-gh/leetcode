public class Solution {
    public int MissingNumber(int[] nums) {
        int sum = 0;
        int total = nums.Length * (nums.Length + 1) / 2;
        for (int i = 0; i < nums.Length; i++) {
            sum += nums[i];
        }
        return total - sum;
    }
}