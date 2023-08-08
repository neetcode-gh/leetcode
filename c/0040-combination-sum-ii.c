void backtrack(int *candidates, int candidatesSize, int target, int start, int *current, int currentSize, int **result, int *resultSize, int *returnColumnSizes) {
    if (target == 0) {
        result[*resultSize] = (int *)malloc(currentSize * sizeof(int));
        returnColumnSizes[*resultSize] = currentSize;
        for (int i = 0; i < currentSize; i++) {
            result[*resultSize][i] = current[i];
        }
        (*resultSize)++;
        return;
    }
    
    for (int i = start; i < candidatesSize; i++) {
        if (i > start && candidates[i] == candidates[i - 1]) {
            continue;  // Skip duplicates to avoid duplicate combinations
        }
        
        if (candidates[i] > target) {
            break;  // Since the array is sorted, we can exit early
        }
        
        current[currentSize] = candidates[i];
        backtrack(candidates, candidatesSize, target - candidates[i], i + 1, current, currentSize + 1, result, resultSize, returnColumnSizes);
    }
}

int compare(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int** combinationSum2(int* candidates, int candidatesSize, int target, int* returnSize, int** returnColumnSizes) {
    qsort(candidates, candidatesSize, sizeof(int), compare);
    
    int **result = (int **)malloc(1000 * sizeof(int *));
    int *current = (int *)malloc(candidatesSize * sizeof(int));
    *returnColumnSizes = (int *)malloc(1000 * sizeof(int));
    
    int resultSize = 0;
    backtrack(candidates, candidatesSize, target, 0, current, 0, result, &resultSize, *returnColumnSizes);
    
    free(current);
    
    *returnSize = resultSize;
    return result;
}
