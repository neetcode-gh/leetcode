using System;
namespace AlgoPractice
{
	public class Solution17
	{
		public int[] TwoSum(int[] numbers, int target)
		{
			var left = 0;
			var right = numbers.Length - 1;

			while(left < right)
            {
				if(numbers[left] + numbers[right] == target)
                {
					return new int[] { left + 1, right + 1 };
                }
				else if(numbers[left] + numbers[right] < target)
                {
					left++;
                }
                else
                {
					right--;
                }
            }
			return new int[] { -1, -1 };
		}
	}
}

