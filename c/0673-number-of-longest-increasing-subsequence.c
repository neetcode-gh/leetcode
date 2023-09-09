int findNumberOfLIS(int* nums, int numsSize) {
    if (numsSize == 0) {
        return 0;
    }
    
    int lengths[numsSize];
    int counts[numsSize];
    int max_length = 1;
    int result = 0;
    
    for (int i = 0; i < numsSize; i++) {
        lengths[i] = 1;
        counts[i] = 1;
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                if (lengths[j] + 1 > lengths[i]) {
                    lengths[i] = lengths[j] + 1;
                    counts[i] = counts[j];
                } else if (lengths[j] + 1 == lengths[i]) {
                    counts[i] += counts[j];
                }
            }
        }
        max_length = fmax(max_length, lengths[i]);
    }
    
    for (int i = 0; i < numsSize; i++) {
        if (lengths[i] == max_length) {
            result += counts[i];
        }
    }
    
    return result;
}
