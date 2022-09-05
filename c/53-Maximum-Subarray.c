int maxSubArray(int* nums, int numsSize){
    int result = nums[0];
    int total = 0;
    
    for (int i = 0; i < numsSize; i++) {
        total += nums[i];
        result = max(result, total);
        if (total < 0) {
            total = 0;
        }
    }
    return result;
}

// C doesn't have a built-in max function
int max(int a, int b) {
    return (a > b) ? a : b;
}