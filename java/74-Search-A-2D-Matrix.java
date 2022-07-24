class Solution {

    public boolean searchMatrix(int[][] matrix, int target) {
        int lrow = 0;
        int rrow = matrix.length - 1;
        int n = 0;

        while (lrow < rrow) {
            n = (lrow + rrow) / 2;
            if (matrix[n][0] > target) rrow = n; else if (
                matrix[n][matrix[0].length - 1] < target
            ) lrow = n + 1; else break;
        }

        if (
            Arrays.binarySearch(matrix[(lrow + rrow) / 2], target) >= 0
        ) return true; else return false;
    }
}
