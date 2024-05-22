class Solution {
    public int minDays(int n) {
        Map<Integer, Integer> dp = new HashMap<>();
        dp.put(0, 0);
        dp.put(1, 1);
        return dfs(n, dp);
    }

    private int dfs(int n, Map<Integer, Integer> dp) {
        if (dp.containsKey(n)) {
            return dp.get(n);
        }
        int optionOne = 1 + n % 2 + dfs(n / 2, dp);
        int optionTwo = 1 + n % 3 + dfs(n / 3, dp);
        dp.put(n, Math.min(optionOne, optionTwo));
        return dp.get(n);
    }
}
