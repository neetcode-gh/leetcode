int removeDuplicates(int* nums, int numsSize){
    int indx = 1;
    
    for(int i = 1; i < numsSize; i++){
        if(nums[i] != nums[i-1]){
            nums[indx] = nums[i];
            indx++;
        }
    }
    return indx;
}

