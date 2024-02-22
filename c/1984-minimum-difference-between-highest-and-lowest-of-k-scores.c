int cmp(const void* a, const void* b) {
    return *(int*)a - *(int*)b;
}

int min(int a, int b){
    if(a > b) return b;
    return a;
}

int minimumDifference(int* nums, int numsSize, int k) {
    if (k == 1) return 0;

    qsort(nums, numsSize, sizeof(int), cmp);
    int res = 1e5;
    int l = 0;
    int r = k - 1;

    while (r < numsSize)
    {
        res = min(res, nums[r] - nums[l]);
        l += 1;
        r += 1;
    }

    return res;
}