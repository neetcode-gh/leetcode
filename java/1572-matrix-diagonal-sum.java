public class Solution {
    public int diagonalSum(int[][] mat) {
        int d1 = 0;
        int d2 = 0;

        for (int i = 0; i < mat.length; i++) {
            for (int j = 0; j < mat[0].length; j++) {
                if (i == j) {
                    d1 += mat[i][j];
                } else if ((i + j) == (mat.length - 1)) {
                    d2 += mat[i][j];
                }
            }
        }
        
        return d1 + d2;
    }
}