public class Solution {
    public int TitleToNumber(string columnTitle) {
        int result = 0;
        char[] chars = columnTitle.ToCharArray().Reverse().ToArray();

        for (int index = 0; index < chars.Length; index++) {
            char currentChar = chars[index];
            int delta = currentChar - 'A' + 1;
            int sum = delta * (int)Math.Pow(26, index);

            result += sum;
        }

        return result;
    }
}