/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* getConcatenation(int* nums, int numsSize, int* returnSize){
    // dynamically allocate a new int array that is double the size of the
    // input array
    int *ans = (int*)malloc(2*numsSize*sizeof(int));

    // loop over input array
    for (int i = 0; i < numsSize; i++) {
        ans[i] = ans[i+numsSize] = nums[i];
    }

    // Set returnSize to double the input size
    *returnSize = 2 * numsSize;
    return ans;
}