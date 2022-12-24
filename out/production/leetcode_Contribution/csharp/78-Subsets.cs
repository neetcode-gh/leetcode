public class Solution {
    private List<int> subset = new List<int>();
    private List<IList<int>> result = new List<IList<int>>();
    private void backtrack(int i, int[] nums) {
        if(i >= nums.Length) {
            result.Add(new List<int>(subset));
            return;
        }
        subset.Add(nums[i]);
        backtrack(i + 1, nums);
        subset.Remove(nums[i]);
        backtrack(i + 1, nums);
            
    }
    public IList<IList<int>> Subsets(int[] nums) {
        backtrack(0, nums);
        return result;  
    }
}