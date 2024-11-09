class Solution {
    public int maxSumMinProduct(int[] nums) {
        Stack<long[]> stack = new Stack<>(); // index, value
        long[] pre = new long[nums.length];
        pre[0] = nums[0];
        long res = 0, mod = (int) 1e9 + 7;
        for (int i = 1; i < nums.length; i++) {
            pre[i] = pre[i - 1] + nums[i];
        }
        for (int i = 0; i < nums.length; i++) {
            int idx = i;
            while (stack.size() != 0 && nums[i] < stack.peek()[1]) {
                long[] t = stack.pop();
                int start = (int) t[0];
                long value = t[1];
                long sum = pre[i - 1] - ((start - 1) < 0 ? 0 : pre[start - 1]);
                res = Math.max(res, (value * sum));
                idx = start;
            }
            stack.push(new long[] { idx, nums[i] });
        }
        while (stack.size() != 0) {
            long[] t = stack.pop();
            int start = (int) t[0];
            long value = t[1];
            long sum = pre[nums.length - 1] - ((start - 1) < 0 ? 0 : pre[start - 1]);
            res = Math.max(res, (value * sum));
        }
        return (int) ((res + mod) % mod);
    }
}