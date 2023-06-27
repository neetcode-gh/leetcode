
int* getConcatenation(int* nums, int numsSize, int* returnSize){
    int n = numsSize;
    int* concatenated = (int*)malloc(2 * n * sizeof(int));
    for(int i=0; i<n;i++){
        concatenated[i]= nums[i];
    }
    for(int i=0; i<n;i++){
        concatenated[n+i]= nums[i];
    }
    *returnSize = 2*n;
    return concatenated;
}