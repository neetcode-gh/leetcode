public class Solution
{
    public int RemoveDuplicates(int[] nums)
    {
        int l = 0;
        int r = 0;

        while ( r < nums.Length)
        {
            int count = 1;

            while (r + 1 < nums.Length && nums[r] == nums[r + 1])
            {
                count++;
                r++;
            }

            for (int i = 0; i < Math.Min(2, count); i++)
            {
                nums[l] = nums[r];
                l++;
            }

            r++;
        }

        return l;
    }
}