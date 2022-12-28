public class Solution
{
    // T: O(M*N) | S: O(M*N)
    public bool IsMatch(string s, string p)
    {
        // Top down
        var cache = new Dictionary<(int, int), bool>();

        bool dfs(int i, int j)
        {
            if (cache.ContainsKey((i, j)))
                return cache[(i, j)];
            if (i >= s.Length && j >= p.Length)
                return true;
            if (j >= p.Length)
                return false;

            var match = i < s.Length && (s[i] == p[j] || p[j] == '.');
            if (j + 1 < p.Length && p[j + 1] == '*')
            {
                cache.TryAdd((i, j), false);
                cache[(i, j)] = (match && dfs(i + 1, j)) || //use *
                  dfs(i, j + 2); //dont use *
                return cache[(i, j)];
            }

            if (match)
            {
                cache.TryAdd((i, j), false);
                cache[(i, j)] = dfs(i + 1, j + 1);
                return cache[(i, j)];

            }

            cache.TryAdd((i, j), false);
            cache[(i, j)] = false;
            return cache[(i, j)];

        }

        return dfs(0, 0);
    }
}