class Solution {

  public int search(int[] nums, int target) {
    int i = 0;
    int j = nums.length - 1;

    while (i <= j) {
      int mid = (i + j) / 2;

      if (nums[mid] == target) return mid; else if (nums[mid] < target) i =
        mid + 1; else j = mid - 1;
    }

    return -1;
  }
}
