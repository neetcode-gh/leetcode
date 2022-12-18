/*
    Given a sorted array of distinct integers and a target value, return the index if the target is found. 
    If not, return the index where it would be if it were inserted in order.

    Ex.
    Input: nums = [1,3,5,6], target = 5
    Output: 2

    1.- Find the number in the middle of the vector.
    2.- Takes a part (first or second), depending on whether or not the target is greater than the middel.
    3.- Change the current left or right part.
    3.- Do this process until the left exceeds the right.

    Time: O(log n)
    Space: O(1)
*/

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] < target)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return left;
    }
};