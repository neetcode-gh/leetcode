class Solution {
    public int findMin(int[] nums) {
        
        int L = 0;
        int R = nums.length - 1;

        while(L < R){
            int M = (L+R) / 2;

            if(nums[M] > nums[R]){
                L = M+1;
            } else {
                R = M;
            }
        }

        return nums[L];
    }
}
