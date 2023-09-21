class Solution {
    public int minOperations(int[] nums, int x) {
        int arrSum = IntStream.of(nums).sum();
        int target = arrSum - x, cur_sum = 0, max_win = -1, l = 0;

        for (int r = 0; r < nums.length; r++) {
            cur_sum += nums[r];

            while (l <= r && cur_sum > target) {
                cur_sum -= nums[l];
                l++;
            }

            if (cur_sum == target)
                max_win = Math.max(max_win, r - l + 1);
        }

        return max_win == -1 ? -1 : nums.length - max_win;
    }
}