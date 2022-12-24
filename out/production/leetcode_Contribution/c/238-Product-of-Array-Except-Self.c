/*
    Time: O(n)
    Space: O(n)

 * Note: The returned array must be malloced, assume caller calls free().
*/

int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    
    int *result = (int *)malloc(sizeof(int)*numsSize);
    memset(result, 1, numsSize*sizeof(result[0])); // Fill up result array with 1s
    
    int pre = 1;
    for(int i=0; i<numsSize; i++) {
        result[i] = pre;
        pre *= nums[i];
    }
    
    int post = 1;
    for(int i=numsSize-1; i>=0; i--) {
        result[i] *= post;
        post *= nums[i];
    }
    
    return result;
}