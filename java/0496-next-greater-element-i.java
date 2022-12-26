class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        
        int[] res = new int[nums1.length];
        int counter=0;
        
        for(int i: nums1){
            res[counter++]=ans(i, nums2);
        }
        
        return res;
        
    }
    
    private int ans(int i, int[] nums){
        for(int n=0; n<nums.length; n++){
            if(nums[n]==i){
                for(int j=n+1; j<nums.length; j++){
                    if(nums[j]>i)
                        return nums[j];
                }
            }
        }
        return -1;
    }
}