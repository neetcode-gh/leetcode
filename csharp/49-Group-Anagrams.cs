public class Solution
{
    public IList<IList<string>> GroupAnagrams(string[] strs)
    {
        IList<IList<string>> result = new List<IList<string>>();
        if (strs == null || strs.Length == 0)
        {
            return result;
        }

        var encodedStrToValueList = new Dictionary<string, List<string>>();
        foreach (var str in strs)
        {
            var arr = new int[26];
            foreach (var c in str)
            {
                arr[c - 'a']++;
            }
            var encodedStr = string.Join('#', arr);
            if (encodedStrToValueList.ContainsKey(encodedStr))
            {
                encodedStrToValueList[encodedStr].Add(str);
            }
            else
            {
                encodedStrToValueList[encodedStr] = new List<string>() { str };
            }
        }

        foreach (var kv in encodedStrToValueList)
        {
            result.Add(kv.Value);
        }
        return result;
    }
}