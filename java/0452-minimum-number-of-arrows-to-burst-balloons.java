class Solution {
    public int findMinArrowShots(int[][] points) {
        Arrays.sort(points, Comparator.comparingInt((int[] a) -> a[0])
                              .thenComparingInt((int[] a) -> a[1]));

        var res = points.length;
        var prev = points[0];
        for (int i = 1; i < points.length; i++) {
            int[] curr = points[i];
            if (curr[0] <= prev[1]) {
                res--;
                prev[0] = curr[0];
                prev[1] = Math.min(curr[1], prev[1]);
            } else {
                prev = curr;
            }
        }

        return res;
    }
}
