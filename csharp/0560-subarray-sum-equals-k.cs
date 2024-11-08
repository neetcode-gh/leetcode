public class Solution
{
    public int SubarraySum(int[] nums, int k)
    {
        Dictionary<int, int> prefixToCounts = new Dictionary<int, int>();
        prefixToCounts.Add(0, 1);

        int sum = 0;
        int res = 0;

        for (int i = 0; i < nums.Length; i++)
        {
            sum += nums[i];
            int diff = sum - k;

            prefixToCounts.TryGetValue(diff, out int count);

            res += count;

            if (prefixToCounts.ContainsKey(sum))
            {
                prefixToCounts[sum] += 1;
                continue;
            }

            prefixToCounts.Add(sum, 1);
        }

        return res;
    }
}