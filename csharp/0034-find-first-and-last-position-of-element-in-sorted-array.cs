public class Solution {
public int[] SearchRange(int[] nums, int target)
        {
            int first = -1, last = -1;

            first = searchEle(nums, target, true);
            if (first == -1)
                return new int[] { first, last };

            last = searchEle(nums, target, false);


            return new int[] { first, last };
        }

        public int searchEle(int[] nums, int target, bool isStart)
        {
  int n = nums.Length;
            int start = 0, end = nums.Length - 1;

            while (start <= end)
            {
                int mid = (start + end )/ 2;
                if (nums[mid] == target)
                {
                    if (isStart)
                    {
                        if (mid == start || nums[mid - 1] != target)
                        {
                            return mid;
                        }
                        end = mid - 1;
                    }
                    else
                    {
                        if (mid == end || nums[mid + 1] != target)
                        {
                            return mid;
                        }
                        start = mid + 1;
                    }
                }
                else if (nums[mid] > target)
                    end = mid - 1;
                else
                    start = mid + 1;

            }
            return -1;
        }
}
