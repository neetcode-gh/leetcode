class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        HashSet<Integer> set = new HashSet<>();
        int ans = 1;
        for (int num: nums) set.add(num);
        for (int num: nums) {
            if (!set.contains(num-1)) {
                int count = 1;
                while (set.contains(num+1)) {
                    num++;
                    count++;
                }
                ans = Math.max(count, ans);
            }
        }
        return ans;
    }
}
