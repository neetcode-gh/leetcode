class Solution {
    public int[] productExceptSelf(int[] nums) {
        int[] ans = new int[nums.length];
        int prod = 1;
        for(int i=0;i<nums.length;i++){
            prod*=nums[i];
        }
        for(int i=0;i<nums.length;i++){
            if(nums[i]>0){
                ans[i]=prod/nums[i];
            }else{
                nums[i]=0;
            }
            
        }
        return ans;
    }
}
