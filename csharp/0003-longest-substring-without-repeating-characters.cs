// hashset
public class Solution
{
    public int LengthOfLongestSubstring(string s)
    {
        int leftPointer = 0, rightPointer = 0, maxLength = 0;
        HashSet<int> chars = new HashSet<int>();

        while (rightPointer < s.Length)
        {
            char currChar = s[rightPointer];
            if (chars.Contains(currChar))
            { 
                // Move left pointer until all duplicate chars removed
                chars.Remove(s[leftPointer]);
                leftPointer++;
            }
            else
            {
                chars.Add(currChar);
                maxLength = Math.Max(maxLength, rightPointer - leftPointer + 1);
                rightPointer++;
            }
        }
        return maxLength;
    }
}

//bitmask
public class Solution
{
    private Int128 ONE = 1;
    public int LengthOfLongestSubstring(string s)
    {
        int Convert(char ch) => ch - ' ';
        Int128 mask = 0;
        int l = 0, r = 0, output = 0;
        while (r < s.Length)
        {
            Int128 temp = mask ^ (ONE << Convert(s[r]));
            if (temp < mask)
            {
                while (s[l] != s[r])
                {
                    mask ^= ONE << Convert(s[l]);
                    l++;
                }
                mask ^= ONE << Convert(s[l]);
                l++;
            }
            else
            {
                mask = temp;
                output = Math.Max(output, r - l + 1);
                r++;
            }
        }

        return output;
    }
}