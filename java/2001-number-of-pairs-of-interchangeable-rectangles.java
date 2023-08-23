class Solution {
    public long interchangeableRectangles(int[][] rectangles) {
        Map<Double, Long> count = new HashMap<>();
        for (int[] rec : rectangles) {
            double key = (double) rec[0] / rec[1];
            count.put(key, count.getOrDefault(key, (long) 0) + 1);
        }

        long res = 0;
        for (long c : count.values()) {
            res += c * (c - 1) / 2;
        }
        return res;
    }
}