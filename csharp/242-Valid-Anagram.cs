public class Solution
{
    public bool IsAnagram(string s, string t)
    {
        var sStrToCount = CreateMap(s);
        var tStrToCount = CreateMap(t);

        if (sStrToCount.Keys.Count != tStrToCount.Keys.Count)
        {
            return false;
        }

        foreach (var key in sStrToCount.Keys)
        {
            if (!tStrToCount.ContainsKey(key))
            {
                return false;
            }
            if (sStrToCount[key] != tStrToCount[key])
            {
                return false;
            }
        }
        return true;
    }

    Dictionary<char, int> CreateMap(string str)
    {
        var dict = new Dictionary<char, int>();
        foreach (var ch in str)
        {
            if (dict.ContainsKey(ch))
            {
                dict[ch]++;
            }
            else
            {
                dict[ch] = 1;
            }
        }
        return dict;
    }
}