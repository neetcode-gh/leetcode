class Solution {
    public long zeroFilledSubarray(int[] nums) {
        long res = 0;
        long count = 0;
        for (int i : nums) {
            if (i != 0) count = 0;
            else count++;
            res += count;
        }
        return res;
    }
}