// While Loop Solution
class Solution
{
    public void ReverseString(char[] s)
    {
        int leftPointer = 0;
        int rightPointer = s.Length - 1;
        while (leftPointer < rightPointer)
        {
            char temp = s[leftPointer];
            s[leftPointer++] = s[rightPointer];
            s[rightPointer--] = temp;
        }
    }
}

// For Loop Solution
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