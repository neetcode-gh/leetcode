/**
 * Given an array nums. We define a running sum of an array as
 * runningSum[i] = sum(nums[0]…nums[i]).
 *
 * Return the running sum of nums.
 *
 * Time: O(n)
 * Space: O(n)
 */

int* runningSum(int* nums, int numsSize, int* returnSize){
    int *ret = malloc(numsSize * sizeof(int));
    *returnSize = numsSize;

    for (int i = 0; i < numsSize; i++) {
        ret[i] = i ? nums[i] + ret[i-1] : nums[i];
    }

    return ret;
}
