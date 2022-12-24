/*
    Given an integer array nums sorted in non-decreasing order, return 
    an array of the squares of each number sorted in non-decreasing order.

    Ex. 
    Input: nums = [-4,-1,0,3,10]
    Output: [0,1,9,16,100]

    1.- Multiply each number of the nums by themselves.
    2.- Use the sort function to sort the vector.

    Time: O(NlogN) 
    Space: O(N)
*/

class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        for (int& i : nums)
            i *= i;
        sort(nums.begin(), nums.end());
        return nums;
    }
};
