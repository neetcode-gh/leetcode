class Solution {
    public int numberOfSubarrays(int[] nums, int k) {
        int res = 0, odds = 0;
        int l = 0, m = 0;

        for(int r = 0; r < nums.length; r++){
            if(nums[r] % 2 == 1)
                odds += 1;

            while(odds > k){
                if(nums[l] % 2 == 1)
                    odds -= 1;
                l += 1;
                m = l;    
            }

            if(odds == k){
                while(nums[m] % 2 != 1){
                    m += 1;
                }
                res += m - l + 1;
            }    
        }
        return res;
    }
}
