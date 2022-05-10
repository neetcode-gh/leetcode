public class Solution12
{
    public int LongestConsecutive(int[] nums)
    {
        var numSet = new HashSet<int>();
        var longest = 0;

        foreach(var num in nums)
        {
            numSet.Add(num);
        }

        foreach(var num in nums)
        {
            var length = 0;
            if (!numSet.Contains(num - 1))
            {
                while (numSet.Contains(num + length))
                {
                    length += 1;
                }

                longest = Math.Max(longest, length);
            }
        }
        return longest;
    }
}