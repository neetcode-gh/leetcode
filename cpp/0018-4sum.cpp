// Time Complexity = O(n^3)
// Space Complexity = O(n)

class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());

        vector<vector<int> > res;
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1])
                continue;
            for (int j = i + 1; j < n; j++) {
                if (j > (i + 1) && nums[j] == nums[j - 1])
                    continue;
                int l = j + 1, r = n - 1;
                while (l < r) {
                    long sm = (long)nums[i] + (long)nums[j] + (long)nums[l] + (long)nums[r];
                    if (sm == target) {
                        res.push_back(vector<int>{nums[i], nums[j], nums[l], nums[r]});
                        l += 1;
                        while (l < r && nums[l] == nums[l - 1])
                            l += 1;
                    }
                    else if (sm > target)
                        r -= 1;
                    else
                        l += 1;
                }
            }
        }
        return res;
    }
};
