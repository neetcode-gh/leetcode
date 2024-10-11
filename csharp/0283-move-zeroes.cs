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

public class NeetCodeWaySolution { //NeetCodeWay
    public void MoveZeroes(int[] nums) {
        if (nums.Length <= 1) return;
        int l = 0, r = 0;
        while (r < nums.Length) {
            if (nums[r] != 0) {
                var t = nums[l];
                nums[l++] = nums[r];
                nums[r++] = t;
            } else {
                ++r;
            }
        }
    }
}
