public class Solution {
    public int LongestConsecutive(int[] nums) 
    {
        var longest = 0;
        var numsSet = new HashSet<int>(nums);
        foreach (var n in nums)
        {
            if (numsSet.Contains(n + 1))
                continue;

            var length = 1;
            while (numsSet.Contains(n - length))
                length++;
            
            longest = Math.Max(longest, length);
        }

        return longest;
    }
}
