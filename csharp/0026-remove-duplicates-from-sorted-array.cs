public class Solution {
    public int RemoveDuplicates(int[] nums) {
        int l = 1, r = 1;
        while (r < nums.Length) {
            if (nums[r] != nums[r - 1]) {
                nums[l] = nums[r];
                ++l;
            }
            ++r;
        }
        return l;
    }
}
