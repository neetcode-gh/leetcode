/*
    Given sorted array after some rotation, find min value
    Ex. nums = [3,4,5,1,2] -> 1, nums = [4,5,6,7,0,1,2] -> 0

    Binary search + ensuring we never disqualify possible min value

    Time: O(log n)
    Space: O(1)
*/

class Solution {
public:
    int findMin(vector<int>& nums) {
        int low = 0;
        int high = nums.size() - 1;
        
        // not low <= high since not searching for target
        while (low < high) {
            int mid = low + (high - low) / 2;
            // ex. [3,4,5,6,7,8,9,1,2], mid = 4, high = 8
            // nums[mid] > nums[high], min must be right
            if (nums[mid] > nums[high]) {
                // never consider mid bc know for sure not min
                low = mid + 1;
            // ex. [8,9,1,2,3,4,5,6,7], mid = 4, high = 8
            // nums[mid] <= nums[right], min must be left
            } else {
                // consider mid still bc could be min
                high = mid;
            }
        }
        
        // low lands on correct value, never disqualified mins
        return nums[low];
    }
};
