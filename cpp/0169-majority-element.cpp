/*
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
Use of Boyer Moore algorithm .
Time complexity O(n)
Space complexity O(1)
*/

class Solution {
public:
   int res=0,count=0;
        for(int i=0;i<nums.size();i++)
        {
            if(count==0) res=nums[i];
            if(nums[i]==res) count+=1;
            else count-=1;
        }
        return res;
};
