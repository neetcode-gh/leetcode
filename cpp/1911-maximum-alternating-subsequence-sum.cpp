/*
Given an array nums, return the maximum alternating sum of any subsequence of nums (after reindexing the elements of the subsequence).
The alternating sum of a 0-indexed array is defined as the sum of the elements at even indices minus the sum of the elements at odd indices.
For example, the alternating sum of [4,2,5,3] is (4 + 5) - (2 + 3) = 4.

Example. Let nums = [6,2,1,2,4,5].
         The subsequence {6,1,5} can be choosen which gives maximum alternating sum of (6 + 5) - 1 = 10, which is the optimal solution in this case.
	 So we return 10 as our answer.



Time: O(n)
Space: O(1)

*/


class Solution {
public:
    long long maxAlternatingSum(vector<int>& nums) {
        long long even = 0, odd = 0, tmpEven, tmpOdd;
        for(int i=nums.size()-1; i>=0; i--) {
            tmpEven = max(odd + nums[i], even);
            tmpOdd = max(even - nums[i], odd);
            even = tmpEven;
            odd = tmpOdd;
        }
        return even;
    }
};