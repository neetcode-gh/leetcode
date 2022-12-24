public class Solution
{
    //O(N.2^N)
    public IList<IList<string>> Partition(string s)
    {
        var result = new List<IList<string>>();
        var stack = new List<string>();

        void dfs(int i)
        {
            if (i >= s.Length)
            {
                result.Add(stack.ToList());
                return;
            }

            for (var j = i; j < s.Length; j++)
            {
                if (IsPalindrome(s, i, j))
                {
                    stack.Add(s.Substring(i, j - i + 1));
                    dfs(j + 1);
                    stack.RemoveAt(stack.Count - 1);
                }
            }

        }

        dfs(0);

        return result;
    }

    public bool IsPalindrome(string s, int l, int r)
    {
        while (l < r)
        {
            if (s[l] != s[r])
                return false;
            l++;
            r--;
        }

        return true;
    }
}