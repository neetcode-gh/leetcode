class Solution {

    public int removeDuplicates(int[] nums) {
   
        if (nums == null || nums.length == 0) {
            return 0;
        } else if (nums.length < 2) {
            return nums.length;
        }

        int fast = 1;
        int slow = 0;
        int counter = 1;

        while (fast < nums.length) {

            if (nums[slow] != nums[fast]) {
                ++slow;
                nums[slow] = nums[fast];
                counter = 1;
            } else if (counter < 2) {
                counter++;
                slow++;
                nums[slow] = nums[fast];
            }
            
            fast++;
        }

        return slow + 1;
    }
}
