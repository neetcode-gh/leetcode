class Solution {
    public int search(int[] nums, int target) {
        int l = 0;
        int r = nums.length - 1;

        while (l <= r) {
            int m = (l + r) / 2;

            if (nums[m] == target) {
                return m;
            }

            if (nums[m] >= nums[l]) {
                if (target > nums[m] || nums[l] > target) {
                    l = ++m;
                }

                else {
                    r = --m;
                }
            }

            else {
                if (target < nums[m] || nums[r] < target) {
                    r = --m;
                }

                else {
                    l = ++m;
                }
            }
        }

        return -1;
    }
}
