class Solution {
    public boolean search(int[] nums, int target) {
        int l=0, r = nums.length-1;
        while(l<=r){
            // to avoid duplicates
          while (l < r && nums[l] == nums[l + 1])
            ++l;
          while (l < r && nums[r] == nums[r - 1])
            --r;

            int m = l + (r-l)/2;
            
            int num = (nums[m]<nums[0])==(target<nums[0])?nums[m]:target<nums[0]?Integer.MIN_VALUE:Integer.MAX_VALUE;
            
            if(num<target){
                l = m+1;
            }
            else if(num>target)
            {
                r = m-1;
            }
            else{
                return true;
            }
            
        }
        return false;
    }
}