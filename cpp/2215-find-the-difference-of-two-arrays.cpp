// Time Complexity: O(n), where n is the maximum length between nums1 and nums2.
// Space Complexity: O(m), where m is the length of the resulting difference vectors.

class Solution
{
public:
    vector<vector<int>> findDifference(vector<int> &nums1, vector<int> &nums2)
    {
        unordered_set<int> nums1Set(nums1.begin(), nums1.end());
        unordered_set<int> nums2Set(nums2.begin(), nums2.end());

        vector<int> lst1;
        vector<int> lst2;

        for (const auto &num : nums1Set)
        {
            if (nums2Set.find(num) == nums2Set.end())
            {
                lst1.push_back(num);
            }
        }

        for (const auto &num : nums2Set)
        {
            if (nums1Set.find(num) == nums1Set.end())
            {
                lst2.push_back(num);
            }
        }

        return {lst1, lst2};
    }
};