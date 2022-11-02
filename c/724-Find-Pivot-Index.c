/*
Given an array of integers nums, calculate the pivot index of this array.

Space: O(1)
Time: O(n)
*/

int pivotIndex(int* nums, int numsSize){
    int right_sum = 0;
    int left_sum = 0;
    for (int i=0; i< numsSize; i++) // Initialise the right sum
        right_sum += nums[i];
    
    for (int i=0; i<numsSize; i++) {
        right_sum -= nums[i];
        if (right_sum == left_sum) {
            return i;
        }
        left_sum += nums[i];
    }
    return -1;
}
