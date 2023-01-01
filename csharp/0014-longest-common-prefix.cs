public class Solution {
    public string LongestCommonPrefix(string[] strs) {
        string result = strs[0];
        int charIndex = 0;
        
        //finding minimum string length  - that could be max common prefix
        int maxCharIndex = strs[0].Length;
        for (int i = 1; i < strs.Length; ++i) {
            maxCharIndex = Math.Min(maxCharIndex, strs[i].Length);
        }

        while (charIndex < maxCharIndex) {
            char prevChar = strs[0][charIndex];
            for (int i = 1; i < strs.Length; ++i) {
                if (prevChar == strs[i][charIndex]) {
                    continue;
                }
                return result.Substring(0, charIndex);
            }
            ++charIndex;
            result += prevChar;
        }
        return result.Substring(0, charIndex);
    }
}
