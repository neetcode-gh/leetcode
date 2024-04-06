class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        return helper(nums, goal) - helper(nums, goal - 1);
    }
    private int helper(int[] nums, int goal){
        if(goal < 0)
            return 0;

        int res = 0, sum = 0;
        int l = 0;

        for(int r = 0; r < nums.length; r++){
            sum += nums[r];
            while(sum > goal){
                sum -= nums[l];
                l += 1;
            }
            res += (r - l + 1);
        }
        return res;
    }
}
