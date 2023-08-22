int min(int a, int b) {
    return a < b ? a : b;
}

int minimumTotal(int** triangle, int triangleSize, int* triangleColSize) {
    // We'll use bottom-up dynamic programming approach
    for (int i = triangleSize - 2; i >= 0; i--) {
        for (int j = 0; j <= i; j++) {
            triangle[i][j] += min(triangle[i + 1][j], triangle[i + 1][j + 1]);
        }
    }
    return triangle[0][0];
}
