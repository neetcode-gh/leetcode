/*
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
*/

class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int count = 0;
        int res = 0;

        for (const int& num: nums) {
            if (count == 0) {
                res = num;
            } 
            count += (num == res) ? 1 : -1;
        }

        return res;
    }
};
