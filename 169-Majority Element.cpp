/*
Given an array nums of size n, return the majority element.
The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
*/

class Solution {
public:
    int majorityElement(vector<int>& nums) {
        map<int,int>mp;
        int n=nums.size();
       for(auto &i:nums){
           if(++mp[i]>n/2)
               return i;
       }
        return -1;
    }
};
