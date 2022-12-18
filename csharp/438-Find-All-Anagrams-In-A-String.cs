public class Solution
{

    public IList<int> FindAnagrams(string s, string p)
    {
        List<int> res = new List<int>();

        int pSize = p.Length;
        int sSize = s.Length;

        if (pSize > sSize)
        {
            return res;
        }

        Dictionary<char, int> pHash = new Dictionary<char, int>();
        Dictionary<char, int> sHash = new Dictionary<char, int>();

        foreach (char c in p)
        {
            int tmp;
            pHash.TryGetValue(c, out tmp);
            pHash[c] = tmp + 1;
        }

        for (int x = 0; x < pSize; x++)
        {
            char c = s[x];
            int tmp;
            sHash.TryGetValue(c, out tmp);
            sHash[c] = tmp + 1;
        }

        if (compareDict(pHash, sHash))
        {
            res.Add(0);
        }

        int i = 1;
        int j = i + pSize - 1;

        while (j < sSize)
        {
            sHash[s[i - 1]]--;

            int tmp;
            sHash.TryGetValue(s[j], out tmp);
            sHash[s[j]] = tmp + 1;

            if (compareDict(pHash, sHash))
            {
                res.Add(i);
            }

            i++;
            j++;
        }

        return res;
    }

    public bool compareDict(Dictionary<char, int> d1, Dictionary<char, int> d2)
    {
        foreach (var i in d1)
        {
            if (d2.ContainsKey(i.Key) && i.Value == d2[i.Key])
            {
                continue;
            }
            else
            {
                return false;
            }
        }

        return true;
    }
}
