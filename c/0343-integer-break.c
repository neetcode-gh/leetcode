int integerBreak(int n) {
    if (n <= 2) {
        return 1;
    }
    
    int maxProducts[n + 1];
    maxProducts[0] = 0;
    maxProducts[1] = 0;
    maxProducts[2] = 1;
    
    for (int i = 3; i <= n; i++) {
        maxProducts[i] = 0;
        for (int j = 1; j <= i / 2; j++) {
            maxProducts[i] = fmax(maxProducts[i], j * (i - j));
            maxProducts[i] = fmax(maxProducts[i], j * maxProducts[i - j]);
        }
    }
    
    return maxProducts[n];
}
