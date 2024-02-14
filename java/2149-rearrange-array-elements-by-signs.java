public class Solution { 
    public int[] rearrangeArray(int[] nums) {
        int i = 0, j = 1;
        int[] res = new int[nums.length];
        for (int k = 0; k < nums.length; k++) {
            if (nums[k] > 0) {
                res[i] = nums[k];
                i += 2;
            } else {
                res[j] = nums[k];
                j += 2;
            }
        }
        return res;
    }
}