public class Solution {
    public bool WordPattern(string pattern, string s) {
        var words = s.Split(' ');
        if (words.Length != pattern.Length) return false;

        Dictionary<char,string> charToWord = new Dictionary<char, string>();
        Dictionary<string, char> wordToChar = new Dictionary<string, char>();

        for (int i = 0; i < pattern.Length; i++) {
            char c = pattern[i];
            string w = words[i];
            if (charToWord.ContainsKey(c) && (charToWord[c] != w)) {
                return false;
            }
            if(wordToChar.ContainsKey(w) && (wordToChar[w] != c)) {
                return false;
            }
            charToWord[c] = w;
            wordToChar[w] = c;
        }
        return true;
    }
}