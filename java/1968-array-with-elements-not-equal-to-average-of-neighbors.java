class Solution {
    public int[] rearrangeArray(int[] nums) { 
        for(int i=1; i <= nums.length-2; i++){
            if( ( ( nums[i-1] < nums[i] && nums[i] < nums[i+1] ) || ( nums[i-1] > nums[i] && nums[i] > nums[i+1] ) )){ //swap
                int temp = nums[i+1];
                nums[i+1] = nums[i];
                nums[i] = temp; 
            }
        }
        return nums;
    }
}