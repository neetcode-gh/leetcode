class Solution {
    public int maxPoints(int[][] points) {
        int res = 1;
        for (int i = 0; i < points.length; i++) {
            int[] p1 = points[i];
            Map<Double, Integer> counter = new HashMap<>();
            for (int j = i + 1; j < points.length; j++) {
                int[] p2 = points[j];
                double slope;
                if (p1[0] == p2[0]) {
                    slope = Double.MAX_VALUE;
                } else if (p1[1] == p2[1]) {
                    slope = 0;
                } else {
                    slope = (double) (p2[1] - p1[1]) / (double) (p2[0] - p1[0]);
                }
                counter.put(slope, counter.getOrDefault(slope, 0) + 1);
                res = Math.max(res, counter.get(slope) + 1);
            }
        }
        return res;
    }
}
