/*
    Given an array of integers, search for a target value.
    Examples: 
        nums = [-1,0,3,5,9,12], target = 9, return 4 (index of target 9)
        nums = [-1,0,3,5,9,12], target = 2, return -1 (not found)
    Array is sorted, so perform binary search

    Time: O(log n)
    Space: O(1)
*/

int search(int* nums, int numsSize, int target) {
    int left = 0;
    int right = numsSize-1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            return mid;
        } 
        else if (nums[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return -1;
}