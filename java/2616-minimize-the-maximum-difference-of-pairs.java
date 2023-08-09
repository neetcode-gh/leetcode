class Solution {
    public int minimizeMax(int[] nums, int p) {
        if (p == 0) return 0;

        Arrays.sort(nums);
        int left = 0, right = 1000000000;
        int res = 1000000000;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (isValid(mid, p, nums)) {
                res = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return res;
    }

    public boolean isValid(int mid, int p, int[] nums) { 
        int index = 0, cnt = 0;
        while (index < nums.length - 1) {
            if (Math.abs(nums[index] - nums[index + 1]) <= mid) {
                cnt++;
                index += 2;
            } else {
                index++;
            }
            if (cnt == p) return true;
        }
        return false;
    }
}