/*
    Given int array, return the one repeated number
    Ex. nums = [1,3,4,2,2] -> 2, nums = [3,1,3,4,2] -> 3

    If there's duplicate, must be a cycle, find meeting point
    Take 1 back to start, they'll intersect at the duplicate

    Time: O(n)
    Space: O(1)
*/

class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = nums[0];
        int fast = nums[nums[0]];
        
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[nums[fast]];
        }
        
        slow = 0;
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
};
