/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* sortedSquares(int* nums, int numsSize, int* returnSize) {

    int* result = malloc(sizeof(nums[0]) * numsSize);
    int right, left;
    int j = numsSize - 1;
    int left_sqr, right_sqr;

    left = 0, right = numsSize - 1;

    while (left <= right) {
        left_sqr = nums[left] * nums[left];
        right_sqr = nums[right] * nums[right];

        if (left_sqr > right_sqr) {
            result[j] = left_sqr;
            left++;
        } else {
            result[j] = right_sqr;
            right--;
        }
        j--;
    }

    *returnSize = numsSize;
    return result;
}