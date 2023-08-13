class Solution {
    public int maxProduct(String s) {
    int[] dp = new int[4096];
    int res = 0, mask = (1 << s.length()) - 1;
    for (int m = 1; m <= mask; ++m)
        dp[m] = palSize(s, m);
    for (int m1 = mask; m1 > 0; --m1)
        if (dp[m1] * (s.length() - dp[m1]) > res)
            for(int m2 = mask ^ m1; m2 > 0; m2 = (m2 - 1) & (mask ^ m1))
                res = Math.max(res, dp[m1] * dp[m2]);
    return res;
}
private int palSize(String s, int mask) {
    int p1 = 0, p2 = s.length(), res = 0;
    while (p1 <= p2) {
        if ((mask & (1 << p1)) == 0)
            ++p1;
        else if ((mask & (1 << p2)) == 0)
            --p2;
        else if (s.charAt(p1) != s.charAt(p2))
            return 0;
        else
            res += 1 + (p1++ != p2-- ? 1 : 0);
    }
    return res;
}
}