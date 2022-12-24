public class Solution
{

    public int Trap(int[] height)
    {

        if (height is null || height.Length == 0) return 0;

        int left = 0, right = height.Length - 1;
        int leftMax = height[left], rightMax = height[right];
        var result = 0;

        while (left < right)
        {
            if (leftMax < rightMax)
            {
                left++;
                leftMax = Math.Max(leftMax, height[left]);
                result += leftMax - height[left];
            }
            else
            {
                right--;
                rightMax = Math.Max(rightMax, height[right]);
                result += rightMax - height[right];
            }
        }

        return result;
    }
}