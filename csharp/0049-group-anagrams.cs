public class Solution {
    public IList<IList<string>> GroupAnagrams(string[] strs) {
        var groups = new Dictionary<string, IList<string>>();

        foreach (string s in strs) {
            char[] hash = new char[26];
            foreach (char c in s) {
                hash[c - 'a']++;
            }
            
            string key = new string(hash);
            if (!groups.ContainsKey(key)) {
                groups[key] = new List<string>();
            }
            groups[key].Add(s);
        }
        return groups.Values.ToList();
    }
}