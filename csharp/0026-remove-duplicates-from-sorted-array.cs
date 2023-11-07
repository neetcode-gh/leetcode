public class Solution
{
    public int RemoveDuplicates(int[] nums)
    {
        if (nums.Length == 0) return 0;

        int correctIndex = 0;

        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i-1] != nums[i])
            {
                correctIndex++;
            }

            nums[correctIndex] = nums[i];
        }

        return correctIndex + 1;
    }
}
