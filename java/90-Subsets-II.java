//Similar to subsets 1. Here, we'll just take care of the duplicates.
//This video was helpful https://www.youtube.com/watch?v=mcg4qKbAmmY&t=316s&ab_channel=Fraz
class Solution {

  public List<List<Integer>> subsetsWithDup(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> ans = new ArrayList<>();
    ArrayList<Integer> list = new ArrayList<>();
    helper(ans, 0, nums, list, false);
    return ans;
  }

  public void helper(
    List<List<Integer>> ans,
    int start,
    int[] nums,
    List<Integer> list,
    boolean ignored
  ) {
    if (start >= nums.length) {
      ans.add(new ArrayList<>(list));
    } else {
      helper(ans, start + 1, nums, list, true);
      //if we've ignored the value earlier then we must ignore all the values after that too
      if (start > 0 && nums[start - 1] == nums[start] && ignored) return;
      list.add(nums[start]);
      helper(ans, start + 1, nums, list, false);
      list.remove(list.size() - 1);
    }
  }
}
