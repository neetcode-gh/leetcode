int firstMissingPositive(int* nums, int numsSize){
    
    int i = 0;

    while(i < numsSize){
        int val = nums[i];
        if(val > 0) val = val - 1;
        
        if(nums[i] > 0 && nums[i] < numsSize && nums[i] != nums[val]){
            int temp = nums[i];
            nums[i] = nums[val];
            nums[val] = temp;
        }
        else i++;
    }

    int ans = numsSize + 1;
    for(int i = 0 ; i < numsSize ; i++){
        if(nums[i] != i+1){
            ans = i+1;
            break;
        }
    }

    return ans;
}