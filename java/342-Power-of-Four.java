class Solution {

    public boolean isPowerOfFour(int n) {
        double x = Math.log(n) / Math.log(4);
        return x == (int) x;
    }
}
