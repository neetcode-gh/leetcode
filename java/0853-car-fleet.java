class Solution {

    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        if (n == 1) {
            return 1;
        }

        double[][] combine = new double[n][2];
        for (int i = 0; i < n; i++) {
            combine[i][0] = position[i];
            combine[i][1] = speed[i];
        }

        Arrays.sort(combine, (d1, d2) -> Double.compare(d1[0], d2[0]));

        Deque<Double> dq = new LinkedList<>();

        for (int i = n - 1; i >= 0; i--) {
            double currentTime = (target - combine[i][0]) / combine[i][1];
            if (!dq.isEmpty() && currentTime <= dq.peek()) {
                continue;
            } else {
                dq.push(currentTime);
            }
        }

        return dq.size();
    }
}