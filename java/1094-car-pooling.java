class Solution {
    public boolean carPooling(int[][] trips, int capacity) {
        int[] passChange = new int[1001];
        for (int[] t : trips) {
            passChange[t[1]] += t[0];
            passChange[t[2]] -= t[0];
        }
        int curPass = 0;
        for (int i = 0; i < 1001; i++) {
            curPass += passChange[i];
            if (curPass > capacity) {
                return false;
            }
        }
        return true;
    }
}
