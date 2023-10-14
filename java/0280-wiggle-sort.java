/*
 * Time complexity: O(n)
 * Space complexity: O(1)
 */

class Solution {
    public void wiggleSort(int[] nums) {
        int n = nums.length;
        for(int i = 1; i < n; i++) {
          int curr = nums[i];
          int prev = nums[i-1];
          if(i % 2 != 0 && prev > curr) {
            swap(nums, i);
            continue;
          }
          if(i % 2 == 0 && prev < curr) swap(nums, i);
        }
    }

    private void swap(int[] nums, int index) {
      int temp = nums[index];
      nums[index] = nums[index-1];
      nums[index-1] = temp;
    }
}
