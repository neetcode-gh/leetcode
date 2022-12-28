public class Solution
{
    // memoization reduces T from O(M^N) to O(M.N) where M- is no. of coins, N is amount 
    public int Change(int amount, int[] coins)
    {
        var mem = new Dictionary<(int, int), int>();

        int dfs(int index, int a)
        {
            if (a == amount)
                return 1;
            if (a > amount)
                return 0;
            if (index == coins.Length)
                return 0;
            if (mem.ContainsKey((index, a)))
                return mem[(index, a)];

            mem[(index, a)] = dfs(index, a + coins[index]) + dfs(index + 1, a);
            return mem[(index, a)];

        }

        return dfs(0, 0);
    }
}