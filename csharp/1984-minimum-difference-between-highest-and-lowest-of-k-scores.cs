public class Solution {
    public int MinimumDifference(int[] nums, int k) {
        int min = Int32.MaxValue;
        int l = 0, r = k - 1;
        Array.Sort(nums);
        while (r < nums.Length) {
            min = Math.Min(min, nums[r] - nums[l]);
            l++;
            r++;
        }
        return min;
    }
}
