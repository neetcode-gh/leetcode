public class Solution {
    public IList<int> CountSmaller(int[] nums) {
        
            var sortedNums = new List<int>();
            var result = new int[nums.Length];

            for (int i = nums.Length - 1; i >= 0; i--)
            {
                int left = 0;
                int right = sortedNums.Count;

                while (left < right)
                {
                    var mid = left + (right - left) / 2;
                    if (sortedNums[mid] >= nums[i]) right = mid;
                    else left = mid + 1;
                }

                result[i] = left;
                sortedNums.Insert(left, nums[i]);
            }

            return result;
    }
}
