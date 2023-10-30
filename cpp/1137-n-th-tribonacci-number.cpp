// Time: O(n)
// Space: O(1)

class Solution {
public:
    int tribonacci(int n) {
        int t[] = {0, 1, 1};
        if (n < 3) {
            return t[n];
        }
        for (int i = 3; i <= n; i++) {
            int sum_t = t[0] + t[1] + t[2];
            t[0] = t[1];
            t[1] = t[2];
            t[2] = sum_t;
        }
        return t[2];
    }
};
