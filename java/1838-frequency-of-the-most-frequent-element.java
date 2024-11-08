class Solution {
    public int maxFrequency(int[] nums, int k) {
        Arrays.sort(nums);
        int left = 0, currSum = 0, res = 0;

        for(int right = 0; right < nums.length; right++){
            int target = nums[right];
            currSum += nums[right];

            while((right - left + 1)*target - currSum > k){
                currSum -= nums[left];
                left++;
            }
            res = Math.max(res, right - left + 1);
        }
        return res;
    }
}
