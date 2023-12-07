public class Solution {
    public string SortString(string s) {
        var charCounts = new Dictionary<char, int>();

        foreach (var ch in s) {
            if (charCounts.ContainsKey(ch)) {
                charCounts[ch]++;
            } else {
                charCounts[ch] = 1;
            }
        }

        var sortedKeys = charCounts.Keys.ToList();
        sortedKeys.Sort();

        var pattern = string.Concat(sortedKeys) + string.Concat(sortedKeys.AsEnumerable().Reverse());
        var maxItem = charCounts.Values.Max();
        var sample = string.Concat(Enumerable.Repeat(pattern, (maxItem / 2) + 1));

        var result = "";

        foreach (var ch in sample) {
            if (charCounts.ContainsKey(ch) && charCounts[ch] > 0) {
                result += ch;
                charCounts[ch]--;
            }
        }

        return result;
    }
}