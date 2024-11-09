/*
 * Time Complexity: O(n);
 * Space Complexity: O(1);
 */

class Solution {
    public int removeDuplicates(int[] nums) {
        int count = 1;
        int index1 = 0;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[index1]) {
                count = 1;
                index1++;
                nums[index1] = nums[i];
            } else {
                count++;
                if (count <= 2) {
                    index1++;                    
                    nums[index1] = nums[i];
                }
            };
        };
        return index1 + 1;
    }
}

class Solution {
    public int removeDuplicates(int[] nums) {
        int k = 0;
        for (int num: nums) {
            if (k < 2 || nums[k-2] != num) {
                nums[k++] = num;
            }
        }
        return k;
    }
}

