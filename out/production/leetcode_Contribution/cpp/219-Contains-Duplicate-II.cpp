class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_map<int,int> number_map;
        for (int i = 0; i < nums.size(); ++i) {
            int num = nums[i];
            if (number_map.find(num) != number_map.end() && i - number_map[num] <= k) {
                return true;
            }else {
                number_map[num] = i;
            }
        }
        return false;
    }
};