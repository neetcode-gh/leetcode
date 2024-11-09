public class Solution 
{
    public int MinSwaps(string s) 
    {
        int open_braces = 0, swaps = 0;
        foreach (var ch in s)
        {
            if (ch == '[')
            {
                open_braces++;
            }
            else
            {
                if (open_braces <= 0)
                {
                    open_braces++;
                    swaps++;
                }
                else
                {
                    open_braces--;
                }
            }
        }

        return swaps;
    }
}