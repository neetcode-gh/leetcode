public class Solution 
{
    public string RemoveStars(string s) 
    {
        var output = new StringBuilder(s.Length);

        foreach (var ch in s)
        {
            if (ch == '*')
            {
                output.Length--;
            }
            else 
            {
                output.Append(ch);
            }
        }

        return output.ToString();
    }
}