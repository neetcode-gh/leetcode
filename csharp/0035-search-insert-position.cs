public class Solution
{
    public int SearchInsert(int[] nums, int target)
    {
        int leftPointer = 0;
        int rightPointer = nums.Length - 1;
        while (leftPointer <= rightPointer)
        {
            int mid = leftPointer + (rightPointer - leftPointer) / 2;
            if (nums[mid] == target)
            {
                return mid;
            }
            else if (nums[mid] < target)
            {
                leftPointer = mid + 1;
            }
            else
            {
                rightPointer = mid - 1;
            }
        }
        return leftPointer;
    }
}