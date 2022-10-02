/*
    Given an array, rotate the array to the right by k steps, where k is non-negative.

    Ex. 
    Input: nums = [1,2,3,4,5,6,7], k = 3 
    Output: [5,6,7,1,2,3,4]

    1.- To avoid problems with the size of the vector we use the remainder of a division
    2.- Reverse the entire vector
    3.- Reverse the parts  


    Time: O(1)
    Space: O(1)
*/

class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        k %= nums.size();
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
    }
};
