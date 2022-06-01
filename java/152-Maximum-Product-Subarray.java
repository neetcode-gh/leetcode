class Solution {
    public int maxProduct(int[] nums) {
        if(nums.length == 1)
            return nums[0];
        int curMax = 1, curMin = 1;
        int res = 0;

        for(int n : nums){
            int tmp = n*curMax;
            curMax = Math.max(n, Math.max(tmp, n*curMin));
            curMin = Math.min(n, Math.min(tmp, n*curMin));
            res = Math.max(curMax, res);
        }
        return res;
    }
}