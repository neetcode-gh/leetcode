// Time complexity : O(n)
// Space complexity : O(1)

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for(int num : nums){
            res^=num;
        }
        return res;
    }
};
