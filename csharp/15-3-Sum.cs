using System;
namespace AlgoPractice
{
	public class Solution
	{
		public IList<IList<int>> ThreeSum(int[] nums)
		{
			Array.Sort(nums);

			IList<IList<int>> triplet = new List<IList<int>>();

			for(var i = 0; i < nums.Length; i++)
            {
				if(i > 0 && nums[i] == nums[i - 1])
                {
					continue;
                }
				Search(-nums[i], i, nums.Length - 1, nums, triplet);
            }
			return triplet;
		}

		private void Search(int target, int left, int right, int[] nums, IList<IList<int>> triplet)
        {
			while(left < right)
			{
				var sum = nums[left] + nums[right];
				if(sum == target)
                {
					triplet.Add(new List<int> { -target, nums[left], nums[right] });
					left++;
					right--;

					while (left < right && nums[left] == nums[left - 1])
					{
						left++;
					}

					while (left < right && nums[right] == nums[right + 1])
					{
						right--;
					}
				}
				else if(sum < target)
                {
					left++;
					
                }
				else
                {
					right--;
                }
			}
        }
	}
}

