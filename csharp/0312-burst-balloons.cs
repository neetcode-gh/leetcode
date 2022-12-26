public class Solution
{
    // T: O(N^3) | S: O(N^2)
    public int MaxCoins(int[] nums)
    {
        var n = nums.Length + 2;
        var memo = new int[n, n];
        //Array.Fill(memo, -1);
        var arr = new int[n];
        arr[0] = 1;
        arr[^1] = 1;
        for (int i = 1; i < n - 1; i++) arr[i] = nums[i - 1];

        return MaxCoins(arr, memo, 1, n - 2);
    }

    private int MaxCoins(int[] arr, int[,] memo, int start, int end)
    {
        if (start > end)
            return 0;

        if (memo[start, end] != 0)
            return memo[start, end];

        memo[start, end] = 0;
        for (var i = start; i < end + 1; i++)
        {
            var coins = arr[start - 1] * arr[i] * arr[end + 1];
            coins += MaxCoins(arr, memo, start, i - 1) + MaxCoins(arr, memo, i + 1, end);
            memo[start, end] = Math.Max(memo[start, end], coins);
        }

        return memo[start, end];
    }

}