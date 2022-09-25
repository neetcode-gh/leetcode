int maxProduct(int* nums, int numsSize){
    int res = nums[0], curMin = 1, curMax = 1;
    
    for (int i = 0; i < numsSize; i++) {
        int temp = curMax * nums[i];
        curMax = max(max(nums[i] * curMax, nums[i] * curMin), nums[i]);
        curMin = min(min(temp, nums[i] * curMin), nums[i]);
        res = max(res, curMax);
    }
    return res;
}

// C doesn't have a built-in max function
int max(int a, int b) {
    return (a > b) ? a : b;
}

// C doesn't have a built-in min function
int min(int a, int b) {
    return (a < b) ? a : b;
}