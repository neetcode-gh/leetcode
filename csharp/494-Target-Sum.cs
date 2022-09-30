public class Solution
{
    public int FindTargetSumWays(int[] nums, int target)
    {
        return Dp(nums, target, nums.Length - 1, 0, new Dictionary<(int, int), int>());
    }

    private int Dp(int[] nums, int target, int index, int sum, Dictionary<(int, int), int> memo)
    {
        if (memo.ContainsKey((index, sum))) return memo[(index, sum)];
        if (index < 0 && sum == target) return 1;
        if (index < 0) return 0;

        var positive = Dp(nums, target, index - 1, sum + nums[index], memo);
        var negative = Dp(nums, target, index - 1, sum + -1 * nums[index], memo);

        memo.Add((index, sum), positive + negative);
        return memo[(index, sum)];
    }
}