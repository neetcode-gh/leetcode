using System;
namespace AlgoPractice
{
	public class Solution
	{
		public int Trap(int[] height)
		{
			var left = 0;
			var right = height.Length - 1;

			var maxLeft = height[left];
			var maxRight = height[right];

			var result = 0;

			while(left < right)
            {
				if(maxLeft < maxRight)
                {
					left++;
					var currentResult = maxLeft - height[left];
					if(currentResult > 0)
					{
						result += currentResult;
					}
					maxLeft = Math.Max(maxLeft, height[left]);
                }
                else
                {
					right--;
					var currentResult = maxRight - height[right];
					if(currentResult > 0)
                    {
						result += currentResult;
                    }
					maxRight = Math.Max(maxRight, height[right]);
                }

            }
			return result;
		}
	}
}

