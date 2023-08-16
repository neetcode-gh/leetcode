class Solution {
public:
    int arraySign(vector<int>& nums) {
        int sign = 1;
        int n = nums.size();
        for (int i = 0; i < n; i++)
        {
            if (nums[i] == 0)
                return 0;
            else if (nums[i] > 0)
                sign *= 1;
            else
                sign *= -1;
        }
        return (sign);
    }
};