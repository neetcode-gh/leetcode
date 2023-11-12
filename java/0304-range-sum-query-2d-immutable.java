class NumMatrix {
    int[][] sum;

    public NumMatrix(int[][] matrix) {
        int row = matrix.length;
        int col = matrix[0].length;
        this.sum = new int[row + 1][col + 1];

        for (int r = 0; r < row; r++) {
            int prefix = 0;
            for (int c = 0; c < col; c++) {
                prefix += matrix[r][c];
                int above = sum[r][c + 1];
                sum[r + 1][c + 1] = prefix + above;
            }
        }
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        return sum[row2 + 1][col2 + 1] - sum[row2 + 1][col1] - sum[row1][col2 + 1] + sum[row1][col1];
    }
}
