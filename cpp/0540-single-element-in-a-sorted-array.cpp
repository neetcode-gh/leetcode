// Time complexity: O(log n)
// Space complexity: O(1)

class Solution
{
public:
    int singleNonDuplicate(vector<int> &nums)
    {
        int left = 0, right = nums.size() - 2;

        while (left <= right)
        {
            int mid1 = (left + right) >> 1;
            int mid2 = mid1 ^ 1;
            if (nums[mid1] == nums[mid2])
            {
                left = mid1 + 1;
            }
            else
            {
                right = mid1 - 1;
            }
        }

        return nums[left];
    }
};