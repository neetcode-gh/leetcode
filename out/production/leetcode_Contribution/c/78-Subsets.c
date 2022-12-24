

/**
 * Return an array of arrays of size *returnSize.
 * The sizes of the arrays are returned as *returnColumnSizes array.
 * Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().
 */

int nCr(int* factorials, int n, int r) {
    return (int)(factorials[n] / (factorials[r] * (factorials[n - r])));
}

int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes){
    
    int* factorials = (int*)malloc((numsSize + 1) * sizeof(int));
    factorials[0] = 1;
    factorials[1] = 1;
    
    for (int i = 2; i < (numsSize + 1); i++) {
        factorials[i] = factorials[i - 1] * i;
    }
    
    int combinations = 0;
    for (int i = 0; i < (numsSize + 1); i++) {
        combinations += nCr(factorials, numsSize, i);
    }
    *returnSize = combinations;
    
    int** result = (int**)malloc(combinations * sizeof(int*));
    returnColumnSizes[0] = (int*)malloc(combinations * sizeof(int));
    returnColumnSizes[0][0] = 0;
    
    int current_size = 1;
    int lead = 1;
    for (int i = 0; i < numsSize; i++) {
        for (int j = 0; j < current_size; j++) {
            int* new_subset = (int*)malloc((returnColumnSizes[0][j] + 1) * sizeof(int));
            for (int k = 0; k < returnColumnSizes[0][j]; k++) {
                new_subset[k] = result[j][k];
            }
            new_subset[returnColumnSizes[0][j]] = nums[i];
            result[lead] = new_subset;
            returnColumnSizes[0][lead] = (returnColumnSizes[0][j] + 1);  
            lead += 1;
        }   
        current_size = lead;
    }
    free(factorials);
    return result;
}