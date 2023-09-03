int* shuffle(int* nums, int numsSize, int n, int* returnSize) {
    *returnSize = numsSize;
    int* result = (int*)malloc(numsSize * sizeof(int));

    int i, j, k;
    i = j = k = 0;

    while (i < n) {
        result[k++] = nums[i];
        result[k++] = nums[i + n];
        i++;
    }

    return result;
}
