public class Solution {
  public IList<string> LetterCombinations(string digits)
        {
            var lettersMap = new Dictionary<char, string>
            {
                {'2', "abc"},
                {'3', "def"},
                {'4', "ghi"},
                {'5', "jkl"},
                {'6', "mno"},
                {'7', "pqrs"},
                {'8', "tuv"},
                {'9', "wxyz"}
            };

            var result = new List<string>();

            if (!string.IsNullOrEmpty(digits))
                Backtrack(result, digits, lettersMap, "", 0);

            return result;
        }

        void Backtrack(List<string> result, string digits, Dictionary<char, string> lettersMap, string curString, int start)
        {
            if (curString.Length == digits.Length)
            { result.Add(curString); return; }

            foreach (var c in lettersMap[digits[start]])
            {
                Backtrack(result, digits, lettersMap, curString + c, start + 1);
            }
        }
}
