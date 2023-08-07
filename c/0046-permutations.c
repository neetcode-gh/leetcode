void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void backtrack(int* nums, int numsSize, int** result, int* returnSize, int* current, int index) {
    if (index == numsSize) {
        result[*returnSize] = (int*)malloc(numsSize * sizeof(int));
        for (int i = 0; i < numsSize; i++) {
            result[*returnSize][i] = current[i];
        }
        (*returnSize)++;
        return;
    }

    for (int i = index; i < numsSize; i++) {
        swap(&nums[i], &nums[index]);
        current[index] = nums[index];
        backtrack(nums, numsSize, result, returnSize, current, index + 1);
        swap(&nums[i], &nums[index]);
    }
}

int** permute(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    int totalPermutations = 1;
    for (int i = 1; i <= numsSize; i++) {
        totalPermutations *= i;
    }

    int** result = (int**)malloc(totalPermutations * sizeof(int*));
    int* current = (int*)malloc(numsSize * sizeof(int));
    *returnSize = 0;
    *returnColumnSizes = (int*)malloc(totalPermutations * sizeof(int));

    backtrack(nums, numsSize, result, returnSize, current, 0);

    for (int i = 0; i < totalPermutations; i++) {
        (*returnColumnSizes)[i] = numsSize;
    }

    free(current);
    return result;
}
