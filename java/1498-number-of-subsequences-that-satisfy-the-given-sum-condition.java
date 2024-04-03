class Solution {
    public int numSubseq(int[] nums, int target) {
        Arrays.sort(nums);
        int left = 0, right = nums.length-1;
        long result = 0;
        long mod = (int) 1e9 + 7;
        while(left <= right) {
            if(nums[left] + nums[right] > target) {
                right--;
            } else {
                result = (result + fastPower(2, right - left, mod)) % mod;
                left++;
            }
        }
        return (int) (result % mod);
    }

    long fastPower(int a, int b, long mod) {
        long ans = 1;
        long base = a;
        while (b != 0) {
            if (b % 2 == 1) {
                ans = (ans * base) % mod;
            }
            base = (base * base) % mod;
            b /= 2;
        }
        return ans;
    }
}