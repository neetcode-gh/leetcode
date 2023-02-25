public class Solution
{
    public void MoveZeroes(int[] nums)
    {
        int readIndex = 0;
        int writeIndex = 0;

        while (readIndex < nums.Length)
        {
            if (nums[readIndex] == 0)
            {
                readIndex++;
                continue;
            }
            if (readIndex != writeIndex)
            {
                nums[writeIndex] = nums[readIndex];
                nums[readIndex] = 0;
            }
            writeIndex++;
            readIndex++;
        }
    }
}