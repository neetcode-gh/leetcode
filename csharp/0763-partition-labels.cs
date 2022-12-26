public class Solution
{
    public IList<int> PartitionLabels(string s)
    {

        var chars = new int[26];
        for (var ch = 0; ch < s.Length; ch++)
        {
            chars[s[ch] - 'a'] = ch;
        }

        var result = new List<int>();
        var end = 0;
        var size = 0;
        for (var i = 0; i < s.Length; i++)
        {
            end = Math.Max(chars[s[i] - 'a'], end);
            size++;
            if (i == end)
            {
                result.Add(size);
                size = 0;
            }

        }

        return result;
    }
}