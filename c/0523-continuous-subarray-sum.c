#define FREE_AND_RETURN(x, y) \
free(x); \
return y;

bool checkSubarraySum(int* nums, int numsSize, int k){
    unsigned int* sums = NULL;
    int i, j;

    // Early return edge cases.
    if (numsSize < 2) {
        return false;
    }
    if (k == 1) {
        return true;
    }

    sums = (unsigned int*)malloc(numsSize * sizeof(unsigned int));
    sums[0] = nums[0];
    for (i = 1; i < numsSize; i++) {
        // Return true, when there are two continuous nums are times of k.
        if (nums[i] % k == 0 && nums[i - 1] % k == 0) {
            FREE_AND_RETURN(sums, true);
        }

        sums[i] = nums[i] + sums[i - 1];

        // Return true, when the current subarray sum is times of k.
        if (sums[i] % k == 0) {
            FREE_AND_RETURN(sums, true);
        }
    }

    for (i = 0; i < numsSize; i++) {
        if (sums[i] < k) {
            continue;
        }

        for (j = 0; j < i - 1; j++) {
            // Return true, when the any subarray sum is times of k.
            if ((sums[i] - sums[j]) % k == 0) {
                FREE_AND_RETURN(sums, true);
            }
        }
    }

    FREE_AND_RETURN(sums, false);
}
