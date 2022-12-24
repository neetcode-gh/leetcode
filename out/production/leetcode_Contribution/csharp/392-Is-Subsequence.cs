public class Solution
{
    public bool IsSubsequence(string s, string t)
    {
        int i = 0;
        int j = 0;
        while ((i < s.Length) && (j < t.Length))
        {
            if (s[i] == t[j])
            {
                i += 1;
            }
            j += 1;

        }
        if (i == s.Length)
        {
            return true;
        }
        else return false;
    }
}