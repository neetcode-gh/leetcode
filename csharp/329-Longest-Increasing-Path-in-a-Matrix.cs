public class Solution
{
    //T: O(N*M) | S: O(N*M) || has complex topological sort order and hence memoization.
    public int LongestIncreasingPath(int[][] matrix)
    {

        var rows = matrix.Length;
        var cols = matrix[0].Length;
        var maxValue = int.MinValue;

        var dictionary = new Dictionary<(int, int), int>();

        int dfs(int i, int j, int previous)
        {
            if (i >= matrix.Length || j >= matrix[0].Length || i < 0 || j < 0 || matrix[i][j] <= previous)
                return 0;

            if (dictionary.ContainsKey((i, j)))
                return dictionary[(i, j)];


            var value = 1 + Math.Max(
                                    Math.Max(
                                        Math.Max(dfs(i + 1, j, matrix[i][j]), dfs(i - 1, j, matrix[i][j])),
                                        dfs(i, j - 1, matrix[i][j])),
                                    dfs(i, j + 1, matrix[i][j]));

            dictionary.TryAdd((i, j), 0);
            dictionary[(i, j)] = value;

            maxValue = Math.Max(maxValue, value);
            return value;
        }

        for (var i = 0; i < rows; i++)
        {
            for (var j = 0; j < cols; j++)
            {
                dfs(i, j, -1);
            }
        }
        return maxValue;
    }
}