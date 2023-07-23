class Solution {
public:
    int arraySign(vector<int>& nums) {
        int neg = 0;
        for (auto n: nums)
        {
            if (n == 0)
                return 0;
            if (n < 0)
                neg++;
        }
        if (neg % 2 == 0)
            return 1;

        return -1;
    }
};
