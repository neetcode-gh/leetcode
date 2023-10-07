class Solution {
    public int integerBreak(int n) {
        if (n < 4) return n - 1;

        int res = 1;

        while (n > 4) {
            n -= 3;
            res *= 3;
        } 

        res *= n;
        return res;
    }
}
