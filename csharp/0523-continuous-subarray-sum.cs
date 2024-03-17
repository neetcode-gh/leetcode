public class Solution
{
    public bool CheckSubarraySum(int[] nums, int k)
    {
        var remainder = new Dictionary<int, int>();
        remainder.Add(0, -1);
        var total = 0;
        for (var i = 0; i < nums.Length; i++)
        {
            total += nums[i];
            var r = total % k;
            if (!remainder.ContainsKey(r))
                remainder.Add(r, i);
            else if (i - remainder[r] > 1)
                return true;
        }
        return false;
    }
}