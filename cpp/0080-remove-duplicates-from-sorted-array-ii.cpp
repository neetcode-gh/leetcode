/*
    Given a sorted array nums, remove some duplicates in-place such that each unique element appears at most twice.
    Ex:- nums = [1,1,1,2,2,3] -> [1,1,2,2,3,_]

    Input  -> nums = [1,1,1,2,2,3]
    Output -> 5

    Use two pointers to find at most 2 duplicates.

    Time - O(n)
    Space - O(1)
*/

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int k = 2; // define at most k times of duplicate numbers
        
        int l = 1, count = 1;

        for(int r = 1; r < nums.size(); r++){
            if(nums[r] == nums[r-1]){
                if(count < k)
                    nums[l++] = nums[r];
                count++;
            }
            else {
                count = 1;
                nums[l++] = nums[r];
            }
        }

        return l;
    }
};