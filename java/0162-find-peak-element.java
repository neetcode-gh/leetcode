class Solution {
    public int findPeakElement(int[] nums) {
        int l = 0, r = nums.length-1;
        while(l<=r){
            int m = l + (r-l)/2;
            int left = (m-1==-1)?Integer.MIN_VALUE:nums[m-1];
            int right = (m+1==nums.length)?Integer.MIN_VALUE:nums[m+1];
            if(nums[m]>left && nums[m]>right) return m;
            else if(nums[m]<left) r=m-1;
            else l = m+1;
        }
        return 0;
    }
}
