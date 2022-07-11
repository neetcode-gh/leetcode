//Fast and slow pointer approach
// Time Complexity: O(n)
// Space Complexity: O(1)

class Solution {

  public int findDuplicate(int[] nums) {
    int fast = nums[0];
    int slow = nums[0];
    boolean first = true;
    while (first || fast != slow) {
      if (first) first = false;
      slow = nums[slow];
      fast = nums[nums[fast]];
      if (fast == slow) break;
    }
    int slow2 = nums[0];
    while (slow2 != slow) {
      if (first) first = false;
      slow2 = nums[slow2];
      slow = nums[slow];
      if (slow2 == slow) return slow;
    }
    return slow;
  }
}
