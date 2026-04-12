/*
    Given int array & target, return indices of 2 nums that add to target
    Ex. nums = [2,7,11,15] & target = 9 -> [0,1], 2 + 7 = 9

    At each num, calculate complement, if exists in hash map then return

    Time: O(n)
    Space: O(n)
*/

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        unordered_map<int, int> mp; // val -> index

        for (int i = 0; i < n; i++) {
            int complement = target - nums[i];
            if (mp.find(complement) != mp.end()) {
                return {mp[complement], i};
            }
            mp.insert({nums[i], i});
        }
        return {};
    }
};

/*
    APPROACH-2: Sorting + Two Pointer
    Store the given array in vector of pairs {{value,index}, {value,index}}....
    Then sort the vector of pair..
    After sorting we can apply two pointer aproach.

    Time Complexity: O(nlogn)
    Space Complexity: O(n);
*/

class Solution2{
public:

    vector<int> twoSum(vector<int>& nums, int target) {
        vector<pair<int, int>> array;
        int len = nums.size();
        for(int i=0; i<len; i++){
            array.push_back({nums[i],i});
        }
        sort(array.begin(), array.end());

        int l=0, r=len-1;
        while(l<r){
            int sum =array[l].first + array[r].first;
            
            if(sum==target){
                return {array[l].second, array[r].second};
            }
            else if(sum<target){
                l++;
            }
            else{
                r--;
            }

        }
        return {};
    }

};