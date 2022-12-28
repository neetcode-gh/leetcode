bool canJump(int* nums, int numsSize){
    int goal = numsSize - 1;
    
    for (int i = numsSize - 2; i >= 0; i--) {
        if (i + nums[i] >= goal) {
            goal = i;
        }
    }
    return goal == 0;
}