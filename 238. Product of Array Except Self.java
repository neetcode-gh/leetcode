class Solution {
    public int[] productExceptSelf(int[] nums) {
        
        int N = nums.length;
        int[] result = new int[N];
        int prefix=1;
        for(int i=0;i<N;i++){
            
            result[i] = prefix;
            prefix *= nums[i];
            
        }
        
        int postfix=1;
        for(int i=N-1;i>=0;i--){
            
            result[i] = postfix*result[i] ;
            postfix *= nums[i];
            
        }
        
        return result;
        
    }
}
