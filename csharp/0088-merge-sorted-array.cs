public class Solution
{
    public void Merge(int[] nums1, int m, int[] nums2, int n)
    {
        var index1 = m - 1;
        var index2 = n - 1;
        var targetIndex = m + n - 1;

        for (; targetIndex >= 0; targetIndex--)
        {
            var useNums1 = (index2 < 0) || (index1 >= 0 && nums1[index1] >= nums2[index2]);

            if (useNums1)
            {
                nums1[targetIndex] = nums1[index1];
                index1 -= 1;
            }
            else
            {
                nums1[targetIndex] = nums2[index2];
                index2 -= 1;
            }
        }
    }
}