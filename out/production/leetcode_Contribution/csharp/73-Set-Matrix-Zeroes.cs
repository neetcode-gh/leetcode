public class Solution {
    public void SetZeroes(int[][] matrix) {
            int m = matrix.Length, n = matrix[0].Length;
    bool firstRowHasZeros = matrix[0].Contains(0);

    for (int i = 1; i < m; i++)
        for (int j = 0; j < n; j++)
            if (matrix[i][j] == 0)
                matrix[i][0] = matrix[0][j] = 0;

    for (int i = 1; i < m; i++)
        if (matrix[i][0] == 0)
            Array.Fill(matrix[i], 0);

    for (int j = 0; j < n; j++)
        if (matrix[0][j] == 0)
            for (int i = 0; i < m; i++)
                matrix[i][j] = 0;

    if (firstRowHasZeros)
        Array.Fill(matrix[0], 0);
    }
}
