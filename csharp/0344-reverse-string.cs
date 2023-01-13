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