/*--------------------------------
  Time Complexity: O(n)
  Space Complexity: O(1)
---------------------------------*/  
class Solution {
    public int minPairSum(int[] nums) {
        Arrays.sort(nums);
        int res = Integer.MIN_VALUE;

        for(int i = 0, j = nums.length-1; i < j; i++,j--){
            res = Math.max(res, nums[i]+nums[j]);
        }
        return res;
    }
}
