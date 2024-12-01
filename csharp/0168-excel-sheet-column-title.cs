public class Solution {

    private const int _ASCII_BASE = 64;

    public string ConvertToTitle(int columnNumber)
    {
        StringBuilder sb = new StringBuilder();

        while (columnNumber > 0)
        {
            int rest = columnNumber % 26;
            rest = rest == 0 ? 26 : rest;
            
            sb.Insert(0, (char)(rest + _ASCII_BASE));

            columnNumber -= rest;
            columnNumber /= 26;
        }

        return sb.ToString();
    }
}