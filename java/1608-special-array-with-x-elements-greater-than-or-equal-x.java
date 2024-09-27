class Solution {
    public int specialArray(int[] nums) {
        int[] count = new int[nums.length + 1];
        for (int n : nums) {
            int index = n < nums.length ? n : nums.length;
            count[index] += 1;
        }

        int totalRight = 0;
        for (int i = nums.length; i >= 0; i--) {
            totalRight += count[i];
            if (i == totalRight) {
                return totalRight;
            }
        }

        return -1;
    }
}
