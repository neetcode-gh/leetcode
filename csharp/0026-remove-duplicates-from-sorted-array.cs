public class Solution {
    public int RemoveDuplicates(int[] nums) {
        var left = 1;
        for(var right = 1; right < nums.Length; right++) {
            if(nums[right] != nums[right-1]) {
                nums[left] = nums[right];
                left++;
            }
        }

        return left;
    }
}