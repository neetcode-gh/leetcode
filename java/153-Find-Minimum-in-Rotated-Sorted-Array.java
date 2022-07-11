class Solution {
    public int findMin(int[] nums) {
        int l = 0;
        int r = nums.length - 1;
        
        while (l <= r) {
            if (nums[l] <= nums[r]) {
                return nums[l];
            }
            
            int mid = (l + r) / 2;
            if (nums[mid] >= nums[l]) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return 0;
    }
}
