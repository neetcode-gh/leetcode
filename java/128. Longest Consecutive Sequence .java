class Solution {

  public int longestConsecutive(int[] nums) {

    if (nums.length == 0)
      return 0;

    HashSet < Integer > set = new HashSet < > ();

    for (int i: nums) {
      set.add(i);
    }

    int ans = 1;
    for (int i: nums) {
      if (set.contains(i - 1) == false) {
        int temp = i;

        while (set.contains(temp + 1)) {
          set.remove(temp + 1);
          temp++;
        }
        ans = Math.max(ans, temp - i + 1);
      }

    }

    return ans;
  }
}
