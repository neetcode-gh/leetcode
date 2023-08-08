void backtrack(int* nums, int numsSize, int start, int* subset, int subsetSize, int*** result, int* resultSize, int** resultColSizes) {
    // Add the current subset to the result set
    *result = (int**)realloc(*result, (*resultSize + 1) * sizeof(int*));
    (*result)[*resultSize] = (int*)malloc(subsetSize * sizeof(int));
    for (int i = 0; i < subsetSize; i++) {
        (*result)[*resultSize][i] = subset[i];
    }
    (*resultColSizes) = (int*)realloc(*resultColSizes, (*resultSize + 1) * sizeof(int));
    (*resultColSizes)[*resultSize] = subsetSize;
    (*resultSize)++;

    // Backtracking
    for (int i = start; i < numsSize; i++) {
        // Skip duplicates to avoid duplicates in subsets
        if (i > start && nums[i] == nums[i - 1]) {
            continue;
        }

        subset[subsetSize] = nums[i];
        backtrack(nums, numsSize, i + 1, subset, subsetSize + 1, result, resultSize, resultColSizes);
    }
}

int compare(const void* a, const void* b) {
    return *(int*)a - *(int*)b;
}

int** subsetsWithDup(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    qsort(nums, numsSize, sizeof(int), compare);
    int** result = NULL;
    int* resultColSizes = NULL;
    int* subset = (int*)malloc(numsSize * sizeof(int));
    *returnSize = 0;

    backtrack(nums, numsSize, 0, subset, 0, &result, returnSize, &resultColSizes);

    *returnColumnSizes = resultColSizes;
    free(subset);
    return result;
}
