using System;

public class Solution
{
	public int maxSubArray(int[] nums)
	{
		if (nums.Length == 1)
		{
			return nums[0];
		}

		int sum = 0;
		int max = 0;

		foreach (int n in nums)
		{
			sum += n;
			max = Math.Max(max, sum);

			if (sum < 0)
			{
				sum = 0;
			}
		}
		return max;
	}
}
