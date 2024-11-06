class Solution {
    public int numSubseq(int[] nums, int target) {
        int mod = 1000000007;
        int n = nums.length;
        Arrays.sort(nums);

        int[] pow2 = new int[n];
        pow2[0] = 1;
        for (int i = 1; i < n; i++) {
            pow2[i] = (pow2[i - 1] * 2) % mod;
        }

        int left = 0, right = n - 1;
        int count = 0;

        while (left <= right) {
            if (nums[left] + nums[right] <= target) {
                count = (count + pow2[right - left]) % mod;
                left++;
            } else {
                right--;
            }
        }

        return count;
    }
}
