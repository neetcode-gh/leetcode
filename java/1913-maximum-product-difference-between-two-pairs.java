/*-------------------------------
  Time Complexity: O(n)
  Space Complexity: O(1)
-------------------------------*/
class Solution {
    public int maxProductDifference(int[] nums) {
        int max1 = 0, max2 = 0;
        int min1 = Integer.MAX_VALUE, min2 = Integer.MAX_VALUE;

        for(int n : nums){
            if(n > max2){
                if(n > max1){
                    max2 = max1; 
                    max1 = n;
                }
                else
                    max2 = n;    
            }
            if(n < min2){
                if(n < min1){
                    min2 = min1; 
                    min1 = n;
                }
                else
                    min2 = n;    
            }
        }
        return (max1 * max2) - (min1 * min2);
    }
}

/*------------------------------------
  Time Complexity: O(nlog(n))
  Space Complexity: O(1)
-------------------------------------*/  
class Solution {
    public int maxProductDifference(int[] nums) {
        Arrays.sort(nums);
        int res = (nums[nums.length-1]*nums[nums.length-2]) - (nums[0]*nums[1]);
        return res;
    }
}
