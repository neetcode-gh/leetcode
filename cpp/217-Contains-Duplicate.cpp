class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        map<int, int> valueCount;
        for(auto item: nums)
        {
            valueCount[item] += 1;
        }
        
        for(auto& item: valueCount)
        {
            if(item.second > 1){
                return true;
            }
        }
        return false;
    }
};