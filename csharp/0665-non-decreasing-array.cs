public class Solution
{
    public bool CheckPossibility(int[] nums)
    {
        bool isChanged = false;

        for (int i = 0; i < nums.Length - 1; i++)
        {
            if (nums[i] <= nums[i + 1]) continue;
            
            if (isChanged) return false;

            if (i == 0 || nums[i + 1] >= nums[i - 1])
            {
                nums[i] = nums[i + 1];
            }
            else
            {
                nums[i + 1] = nums[i];
            }

            isChanged = true;
        }

        return true;
    }
}