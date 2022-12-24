int rob(int* nums, int numsSize){
    int n = numsSize;
    
    if (n == 1) {
        return nums[0];
    }
    
    int range1 = robber(nums, 0, n - 2);
    int range2 = robber(nums, 1, n - 1);
    
    return (range1 > range2) ? range1 : range2;
}

int robber(int* nums, int start, int end) {
    int prev = 0;
    int curr = 0;
    int next = 0;
    
    for (int i = start; i <= end; i++) {
        next = (curr > prev + nums[i]) ? curr : prev + nums[i];
        prev = curr;
        curr = next;
    }
    return curr;
}