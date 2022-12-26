public class Solution {
    public int Search(int[] nums, int target) {
        int left = 0, right = nums.Length - 1;

        while (left <= right) {
            int mid = left + ((right - left) / 2); // (left + right) / 2 can lead to overflow
            if (nums[mid] > target) {
                right = mid - 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else { // Found the value
                return mid;
            }
        }
        return -1;
    }
}