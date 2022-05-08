public class Solution
{
    public int[] TwoSum(int[] nums, int target)
    {
        var numToIndex = new Dictionary<int, int>();
        for (var i = 0; i < nums.Length; i++)
        {
            var diff = target - nums[i];
            if (numToIndex.ContainsKey(diff))
            {
                return new int[] { i, numToIndex[diff] };
            }
            else
            {
                numToIndex[nums[i]] = i;
            }
        }

        return new int[0];
    }
}

