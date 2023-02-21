typedef struct {
    int size;
    int *sums;
} NumArray;


NumArray* numArrayCreate(int* nums, int numsSize) {
    NumArray *n = (NumArray*)malloc(sizeof(NumArray));
    n->size = numsSize;
    n->sums = (int*)malloc(sizeof(int) * numsSize);

    // Pre calculate the sum of each index from 0.
    n->sums[0] = nums[0];
    for(int i = 1; i < numsSize; i++){
        n->sums[i] = n->sums[i-1] + nums[i];
    }

    return n;
}

int numArraySumRange(NumArray* obj, int left, int right) {
    assert(obj);
    if (left == 0) {
        return obj->sums[right];
    }
    return obj->sums[right] - obj->sums[left - 1];
}

void numArrayFree(NumArray* obj) {
    if (obj) {
        free(obj->sums);
        free(obj);
    }
}

/**
 * Your NumArray struct will be instantiated and called as such:
 * NumArray* obj = numArrayCreate(nums, numsSize);
 * int param_1 = numArraySumRange(obj, left, right);

 * numArrayFree(obj);
*/
