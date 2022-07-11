class Solution {

  public int search(int[] nums, int target) {
    int minIndex = minIndex(nums);
    int leftSearch = binarySearch(nums, 0, minIndex - 1, target);
    int rightSearch = binarySearch(nums, minIndex, nums.length - 1, target);
    if (leftSearch != -1) {
      return leftSearch;
    } else if (rightSearch != -1) {
      return rightSearch;
    } else {
      return -1;
    }
  }

  public int minIndex(int[] nums) {
    int start = 0;
    int end = nums.length - 1;
    while (start <= end) {
      int mid = start + (end - start) / 2;
      int prev = (mid - 1 + nums.length) % nums.length;
      int next = (mid + 1) % nums.length;
      if (nums[mid] <= nums[prev] && nums[mid] <= nums[next]) {
        return mid;
      } else if (nums[mid] <= nums[end]) {
        end = mid - 1;
      } else if (nums[mid] >= nums[start]) {
        start = mid + 1;
      }
    }
    return -1;
  }

  public int binarySearch(int[] nums, int start, int end, int target) {
    while (start <= end) {
      int mid = start + (end - start) / 2;
      if (nums[mid] == target) {
        return mid;
      } else if (nums[mid] < target) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    return -1;
  }
}
