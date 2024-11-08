/*
    Given an integer array nums, return the number of subarrays filled with 0.
    A subarray is a contiguous non-empty sequence of elements within an array.

    Ex. Input: nums = [1,3,0,0,2,0,0,4]
          Output: 6
	  Explanation: 
	  There are 4 occurrences of [0] as a subarray.
	  There are 2 occurrences of [0,0] as a subarray.
	  There is no occurrence of a subarray with a size more than 2 filled with 0. Therefore, we return 6.

    Time  : O(N)
    Space : O(1) 
*/

class Solution {
public:
    long long zeroFilledSubarray(vector<int>& nums) {
        long long res = 0, count = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i]) {
                res += (count * (count + 1)) / 2;
                count = 0;
            } else 
                ++count;
        }
        res += (count * (count + 1)) / 2;
        return res;
    }
};
