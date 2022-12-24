int jump(int* nums, int numsSize){
    int left = 0;
    int right = 0;
    int res = 0;
    
    while (right < numsSize - 1) {
        int maxJump = 0;
        for (int i = left; i <= right; i++) {
            maxJump = max(maxJump, i + nums[i]);
        }
        left = right + 1;
        right = maxJump;
        res += 1;
    }
    return res;
}

// C doesn't have a built-in max function
int max(int a, int b) {
    return (a > b) ? a : b;
}