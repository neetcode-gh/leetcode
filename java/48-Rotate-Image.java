//         Do note that this is for a sqaure matrix (NxN)
//        The process is to first transpose the matrix and then reverse it
//        Taking the first example: [[1,2,3],[4,5,6],[7,8,9]]
//        After Transpose: [[1,4,7],[2,5,8],[3,6,9]]
//        After Reversal: [[7,4,1],[8,5,2],[9,6,3]]

class Solution {
    public void rotate(int[][] matrix) {
        int N = matrix.length;

        transpose(matrix, N);
        reverse(matrix, N);
    }

    void transpose(int[][] matrix, int n) {
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[j][i];
                matrix[j][i] = matrix[i][j];
                matrix[i][j] = temp;
            }
        }
    }

    void reverse(int[][] matrix, int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
    }
}
