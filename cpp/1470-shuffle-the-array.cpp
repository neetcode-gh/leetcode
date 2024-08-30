class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n)
    {
        vector<int> temp;
        for(int i=0;i<n;i++)
            {
                temp.emplace_back(nums[i]);
                temp.emplace_back(nums[n+i]);
            }
    return temp;   
    }
};
