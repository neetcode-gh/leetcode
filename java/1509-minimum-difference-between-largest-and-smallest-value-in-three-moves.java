class Solution {
    public int minDifference(int[] nums) {
        if(nums.length <= 4)
            return 0;

        Arrays.sort(nums);
        int res = Integer.MAX_VALUE;
        for(int l = 0; l < 4; l++){
            int r = nums.length - 4 + l;
            res = Math.min(res, nums[r] - nums[l]);
        }
        return res;
    }
} 
