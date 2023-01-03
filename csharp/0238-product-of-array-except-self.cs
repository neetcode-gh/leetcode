public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        int prefix = 1, postfix = 1;
        int[] res = new int[nums.Length];        
        
        for(int i = 0; i < nums.Length; i++){
            res[i] = prefix;
            prefix *= nums[i];             
        }
        
        for(int i = nums.Length-1; i>=0; i--){
            res[i] *= postfix;
            postfix *= nums[i];          
        }
        return res;
    }
}
