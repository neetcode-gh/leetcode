class Solution {
    public int findMaxLength(int[] nums) {
        int zero = 0;
        int one = 0;
        int res = 0;

        HashMap<Integer, Integer> diffIndex = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int n = nums[i];
            if (n == 0)
                zero++;
            else
                one++;
            if (diffIndex.get(one - zero) == null)
                diffIndex.put(one - zero, i);

            if (one == zero) {
                res = one + zero;
            } else {
                int idx = diffIndex.getOrDefault(one - zero, 0);
                res = Math.max(res, i - idx);
            }
        }

        return res;
    }
}
