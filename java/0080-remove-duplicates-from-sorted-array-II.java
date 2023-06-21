/*
    Author: Viet2307
    Github: https://github.com/viet2307
    Name - Add Two Numbers
    Link - https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
    Time Complexity O(N)
    Space Complexity - O(1)
*/

class Solution {
    public int removeDuplicates(int[] nums) {
        if(nums.length < 2) return nums.length;
        int curr = 2;
        for(int i = 2; i < nums.length; i++) {
            if(nums[curr - 2] != nums[i]) {
                System.out.println(curr);
                nums[curr] = nums[i];
                curr++;
            }
        }
        return curr;
    }
}