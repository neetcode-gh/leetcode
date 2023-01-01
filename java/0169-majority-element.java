class Solution {
    public int majorityElement(int[] nums) {
        int res = 0, count = 0;
        
        for(int n: nums) {
            if(count == 0)
                res = n;
            count += (n == res? 1: -1);
        }
        
        return res;
    }
}
