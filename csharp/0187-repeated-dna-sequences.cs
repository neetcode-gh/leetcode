public class Solution
{
    public IList<string> FindRepeatedDnaSequences(string s)
    {
        var seen = new HashSet<string>();
        var result = new HashSet<string>();

        for (var i = 0; i < s.Length - 9; i++)
        {
            var cur = s.Substring(i, 10);
            if (seen.Contains(cur))
                result.Add(cur);
            seen.Add(cur);
        }

        return result.ToList();
    }
}