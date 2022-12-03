//Fast and slow pointer approach
// Time Complexity: O(n)
// Space Complexity: O(1)

class Solution {

    public int findDuplicate(int[] nums) {
        int fast = nums[0];
        int slow = nums[0];
        boolean first = true;
        while (first || fast != slow) {
            if (first) first = false;
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (fast == slow) break;
        }
        int slow2 = nums[0];
        while (slow2 != slow) {
            if (first) first = false;
            slow2 = nums[slow2];
            slow = nums[slow];
            if (slow2 == slow) return slow;
        }
        return slow;
    }
    
//     we can use do while in java
    public int findDuplicate(int[] nums) {
		int slow = 0,fast=0;
		/*
		if we assume the array in linkedList we can say the accept first index every index a digit which 
		is possibily the index of another number (1-n) in n+1 
		 and mathematically if c is distance btw start of loop and concerence of slow and fast
		 						p is the distance btwn the 0th index and start of loop and
		 						x is the distance btwn the concurent index and start of loop
		 						we get 2*slow = fast
		 						=> 2(p+c-x) = p+2c-x
		 						=> p-x = 0
		 						=> p == x
		 */
		do {
			slow = nums[slow];
			fast = nums[nums[fast]];
		}while(slow != fast);
		
		int slow2 = 0;
		do {
			slow = nums[slow];
			slow2 = nums[slow2];
		}while(slow != slow2);
        return slow;
    }
}
