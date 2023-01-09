public class Solution {
    public bool IsIsomorphic(string s, string t) {
        Dictionary<string, string> mapST = new Dictionary<string, string>();
        Dictionary<string, string> mapTS = new Dictionary<string, string>();

        for (int i = 0; i < s.Length; i++) {
            string sChar = s[i].ToString();
            string tChar = t[i].ToString();

            if (mapST.ContainsKey(sChar)) {
                if (mapST[sChar] != tChar) {
                    return false;
                }
            } else {
                mapST.Add(sChar, tChar);
            }

            if (mapTS.ContainsKey(tChar)) {
                if (mapTS[tChar] != sChar) {
                    return false;
                }
            } else {
                mapTS.Add(tChar, sChar);
            }
        }

        return true;
    }
}