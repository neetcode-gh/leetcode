public class Solution
{

    //T: O(N*2^N)

    public IList<IList<int>> Subsets(int[] nums)
    {
        var list = new List<IList<int>>();
        Array.Sort(nums);
        backTrack(list, new List<int>(), nums, 0);
        return list;
    }

    private void backTrack(List<IList<int>> list, List<int> curr, int[] nums, int start)
    {
        list.Add(new List<int>(curr));
        for (var i = start; i < nums.Length; i++)
        {
            if (i > start && nums[i] == nums[i - 1]) continue;
            curr.Add(nums[i]);
            backTrack(list, curr, nums, i + 1);
            curr.RemoveAt(curr.Count - 1);
        }
    }
}