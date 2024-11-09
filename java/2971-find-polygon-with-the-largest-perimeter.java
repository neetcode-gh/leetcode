public class Solution {
    
    public long largestPerimeter(int[] nums) {
        Arrays.sort(nums);
        long res = -1, amt = 0;

        for (int i : nums) {
            if (amt > i)
                res = amt + i;
            amt += i;
        }

        return res;
    }
}