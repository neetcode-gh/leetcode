int greater(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

int maxFrequency(int* nums, int numsSize, int k){
    int left, right;
    long sum = 0;
    qsort(nums, numsSize, sizeof(int), greater);

    //
    // Exapmle;
    // nums = [2, 3, 1, 4], k = 3
    //
    // After the array is sorted
    // ------
    // X X X O
    // X X O O
    // X O O O
    // O O O O 
    // ------
    // 'O' represents the value of the array.
    // 'X' represents the value added by each operation.
    // Just need to find the longer interval where the number of 'X'
    // is less than or equal to k.
    //

    for (right = 0, left = 0; right < numsSize; right++) {
        sum += nums[right];
        if ((long)(right - left + 1) * nums[right] - sum > k) {
            sum -= nums[left++];
        }
    }
    return right - left;
}
