/*----------------------------------
  Time Complexity: O(n*log(n))
  Space Complexity: O(1)
-----------------------------------*/

class Solution {
    public int reductionOperations(int[] nums) { 
        Arrays.sort(nums);
        int res = 0;

        for(int i = 1; i < nums.length; i++){
            if(nums[i] != nums[i-1])
                res += nums.length - i;
        }
        return res;
    }
}
