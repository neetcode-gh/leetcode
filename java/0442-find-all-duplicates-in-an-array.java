class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        List<Integer> res = new ArrayList<>();

        for (int n : nums) {
            n = Math.abs(n);
            if (nums[n - 1] < 0)
                res.add(n);
            nums[n - 1] = -nums[n - 1];
        }

        return res;
    }
}
