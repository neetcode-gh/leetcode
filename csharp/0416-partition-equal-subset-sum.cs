public class Solution
{

    public bool CanPartition(int[] nums)
    {


        var sum = nums.Sum();
        if (sum % 2 != 0)
        {
            return false;
        }

        return subSetSum(nums, sum / 2);
    }

    private bool subSetSum(int[] nums, int target)
    {
        var dp = new bool[nums.Length + 1, target + 1];

        for (var i = 0; i < nums.Length + 1; i++)
        {
            for (var j = 0; j < target + 1; j++)
            {
                if (i == 0)
                {
                    dp[i, j] = false;
                }
                if (j == 0)
                {
                    dp[i, j] = true;
                }
            }
        }

        for (var i = 1; i < nums.Length + 1; i++)
        {
            for (var j = 1; j < target + 1; j++)
            {
                if (nums[i - 1] <= j)
                {
                    dp[i, j] = dp[i - 1, j] || dp[i - 1, j - nums[i - 1]];
                }
                else
                    dp[i, j] = dp[i - 1, j];
            }
        }

        return dp[nums.Length, target];
    }
}