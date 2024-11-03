public class Solution
{
    public void ReverseString(char[] s)
    {
        var h = s.Length / 2;
        for (int i = 0; i < h; i++)
        {
            var temp = s[i];
            s[i] = s[s.Length - i - 1];
            s[s.Length - i - 1] = temp;
        }
    }
}