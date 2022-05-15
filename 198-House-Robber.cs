using System;
namespace AlgoPractice
{
	public class Solution
	{
		public int Rob(int[] nums)
		{
			if (nums == null || nums.Length == 0)
			{
				return 0;
			}
			else if (nums.Length == 1)
			{
				return nums[0];
			}

			var rob1 = 0;
			var rob2 = 0;
			foreach (var n in nums)
			{
				var temp = Math.Max(rob1 + n, rob2);
				rob1 = rob2;
				rob2 = temp;
			}
			return rob2;
		}
	}
}

