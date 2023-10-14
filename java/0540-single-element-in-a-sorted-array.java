/*
 * Time complexity: O(n)
 * Space complexity: O(1)
 */

class Solution {
    public int singleNonDuplicate(int[] nums) {
        int n = nums.length;
        int left = 0, right = n-1;

        // if nums only has one element
        if(n < 2) return nums[0];
        
        // if the answer lies at either end of the array
        if(nums[left+1] != nums[left]) return nums[left];
        if(nums[right-1] != nums[right]) return nums[right];

        // when you see requirement of O(log n) time and O(1) space
        // most of the time you gonna need binary search
        // either that or some hacky method using math or bitwise
        while(left < right) {
            int mid = left + (right-left)/2;
            int curr = nums[mid];
            // we already check either end so mid will never gonna be out of array's bound
            int prev = nums[mid-1];
            int next = nums[mid+1];

            // if mid lands on the result, just return it
            if(prev != curr && curr != next) return curr;

            // because there are no others criteria
            // remember to check the array's index to see if you miss anything
            // you can see that the even index should always be the start of the duplication
            // so if the sequence is broken: left of odd index is still a duplicate, the sequence
            // was broken before that index -> right = mid and vice versa
            if(mid % 2 == 0) {
                if(curr != prev) left = mid+1;
                else right = mid;
                continue;
            }

            if(curr == prev) left = mid+1;
            else right = mid;
        }
        return nums[left];
    }
}