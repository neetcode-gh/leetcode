using System;
namespace AlgoPractice
{
	public class Solution
	{
		public int MaxProfit(int[] prices)
		{
			var maxProfit = 0;

			var left = 0;
			var right = 1;

			while (right < prices.Length)
            {
				var profit = prices[right] - prices[left];
				if(profit > 0)
                {
					maxProfit = Math.Max(profit, maxProfit);
                }
				else
                {
					left = right;
                }
				right++;
            }

			return maxProfit;
		}
	}
}

