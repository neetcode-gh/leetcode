public class Solution {
    public int[] GetConcatenation(int[] nums) {
        int n = nums.Length;
        int[] toReturn = new int[2 * n];
        
        for (int i = 0; i < n; i++) {
            toReturn[i] = nums[i];
            toReturn[i + n] = nums[i];
        }
        
        return toReturn;
    }
}