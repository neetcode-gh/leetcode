using System;
namespace AlgoPractice
{
	public class Solution
	{
		public int Rob(int[] nums)
		{
			var startFromHouse1 = RobHelper(nums, 0, nums.Length - 2);
			var startFromHouse2 = RobHelper(nums, 1, nums.Length - 1);
			var result = Math.Max(startFromHouse1, startFromHouse2);
			return result;
		}

		public int RobHelper(int[] num, int start, int end)
        {
			var rob1 = 0;
			var rob2 = 0;
			for(var i = start; i<= end; i++)
            {
				var temp = Math.Max(rob1 + num[i], rob2);
				rob1 = rob2;
				rob2 = temp;
            }
			return rob2;
        }
	}
}

