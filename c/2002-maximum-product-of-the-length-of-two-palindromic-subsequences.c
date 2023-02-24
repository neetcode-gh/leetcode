int palSize(char *s, int size, int mask) {
    int left = 0, right = size, res = 0;
    while (left <= right) {
        if ((mask & (1 << left)) == 0) {
            left++;
        } else if ((mask & (1 << right)) == 0) {
            right--;
        } else if (s[left] != s[right]) {
            return 0;
        } else {
            res += 1 + (left++ != right--);
        }
    }
    return res;
}

int max(int a, int b) {
    if (a > b) return a;
    return b;
}

int maxProduct(char * s) {
    int n = strlen(s);
    int dp[4096] = {}, res = 0, mask = (1 << n) - 1;
    int i, j;

    for (i = 1; i <= mask; i++) {
        dp[i] = palSize(s, n, i);
    }

    for (i = mask; i > 0; i--) {
        if (dp[i] == 0) continue;
        for(j = mask ^ i; j > 0; j = (j - 1) & (mask ^ i)) {
            if (dp[j] == 0) continue;
            res = max(res, dp[i] * dp[j]);
        }
    }
    return res;
}
