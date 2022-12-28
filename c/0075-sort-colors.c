/*
Given an array nums with n objects colored red, white, or blue, sort 
them in-place so that objects of the same color are adjacent, with 
the colors in the order red, white, and blue.

Space: O(1)
Time: O(n) (one-pass algorithm)
*/


void swap(int* nums, int a, int b) {
    int tmp = nums[a];
    nums[a] = nums[b];
    nums[b] = tmp;
}

void sortColors(int* nums, int numsSize){
    int pos1 = 0;
    int right = numsSize-1;
    int left = 0;
    // Before index (left-pos1) -> only 0
    // Between indexes (left-pos1) and left -> only 1
    // After indexe left -> only 2
    while (left<=right) {
        if (nums[left]==2) {
            swap(nums, left, right);
            right--;
        } else if (nums[left]==0) {
            swap(nums, left, left-pos1);
            left++;
        } else {
            pos1++;
            left++;
        }
    }
}
