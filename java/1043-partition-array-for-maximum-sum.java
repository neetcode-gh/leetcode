class Solution {
    public int maxSumAfterPartitioning(int[] arr, int k) {
        Integer[] cache = new Integer[arr.length];
        return dfs(arr, k, 0, cache);
    }

    private int dfs(int[] arr, int k, int i, Integer[] cache) {
        if (i == arr.length) {
            return 0;
        }
        if (cache[i] != null) {
            return cache[i];
        }
        int curMax = 0;
        int res = 0;
        for (int j = i; j < Math.min(arr.length, i + k); j++) {
            curMax = Math.max(curMax, arr[j]);
            int windowSize = j - i + 1;
            res = Math.max(res, dfs(arr, k, j + 1, cache) + curMax * windowSize);
        }
        cache[i] = res;
        return res;
    }
}
