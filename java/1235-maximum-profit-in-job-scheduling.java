class Solution {
    int[][] intervals;
    Integer[] cache;

    public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
        int n = startTime.length;
        intervals = new int[n][3];
        cache = new Integer[n];

        for (int i = 0; i < n; i++) {
            intervals[i] = new int[]{startTime[i], endTime[i], profit[i]};
        }

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        return dfs(0);
    }

    private int dfs(int i) {
        if (i == intervals.length) {
            return 0;
        }

        if (cache[i] != null) {
            return cache[i];
        }

        // don't include
        int res = dfs(i + 1);

        // include
        int j = binarySearch(intervals, i, intervals[i][1]);
        cache[i] = res = Math.max(res, intervals[i][2] + dfs(j));

        return res;
    }

    private int binarySearch(int[][] intervals, int start, int target) {
        int left = start + 1;
        int right = intervals.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (intervals[mid][0] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return left;
    }
}
