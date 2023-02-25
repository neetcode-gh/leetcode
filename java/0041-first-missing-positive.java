class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length, size = 0;

        while(n > 0){
            n = n>>1;
            size++;
        }
        n = nums.length;
        int pivot = 0;
        

        for(int i = 0; i < n; i++){
            if(nums[i] <= 0 || nums[i] > n){
                int temp = nums[i];
                nums[i] = nums[pivot];
                nums[pivot] = temp;
                pivot++;
            }
        }
        for(int i= 0; i < pivot; i++)
            nums[i] = 0;
        for(int i= pivot; i < n; i++){
            nums[(nums[i] - 1)&((1<<size) - 1)] |= (1<<size);
        }
        for(int i= 0; i < n; i++)
            if((nums[i] & (1<<size)) == 0)
                return i+1;
        return n+1;
    }
}
