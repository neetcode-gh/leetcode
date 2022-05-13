using System;
namespace AlgoPractice
{
	public class Solution20
	{
		public int MaxArea(int[] height)
        {
			var left = 0;
			var right = height.Length - 1;
			var maxArea = 0;

			while(left < right)
            {
				var area = (right - left) * Math.Min(height[left], height[right]);
				maxArea = Math.Max(maxArea, area);

				if(height[left] < height[right])
                {
					left++;
                }
				else
                {
					right--;
                }
            }

			return maxArea;
        }
	}
}

