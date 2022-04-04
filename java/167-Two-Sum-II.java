class Solution {
    public int[] twoSum(int[] nums, int target) {
        int i=0;
        int j=nums.length-1;
        while(i<j){
            if(nums[i]+nums[j]==target){
                int[] ar={i+1,j+1};
                return ar;
            }
            if(nums[i]+nums[j]>target){
                j--;
            }
            if(nums[i]+nums[j]<target){
                i++;
            }
        }
        return null;
    }
}