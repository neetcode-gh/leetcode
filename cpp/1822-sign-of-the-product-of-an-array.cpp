// Time:  O(n)
// Space: O(1)

class Solution {
public:
    int arraySign(vector<int>& nums) {
        int neg = 0;
        for (int i : nums) {
            if (i == 0) {
                return 0;
            } else {
                neg += (i < 0) ? 1 : 0;
            }
        }
        return (neg % 2 == 0) ? 1 : -1;
    }
};
