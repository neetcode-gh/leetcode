// https://leetcode.com/submissions/detail/761120641/
class DetectSquares {
    private Integer[][] matrix;

    public DetectSquares() {
        matrix = new Integer[1001][1001];
    }

    public void add(int[] point) {
        if (matrix[point[0]][point[1]] == null) {
            matrix[point[0]][point[1]] = 1;
        }
        else {
            matrix[point[0]][point[1]] = matrix[point[0]][point[1]] + 1;
        }
    }

    public int count(int[] point) {
        int currentSquareCount = 0;
        int currentPointCount = 1;
        int startRow = point[0];
        int startCol = point[1];
        int curRow = point[0];
        int curCol = point[1];



        while (curRow != 0 && curCol != 0 )
        {
            curRow--;
            curCol--;
            if (matrix[curRow][curCol] != null && matrix[startRow][curCol] != null && matrix[curRow][startCol] != null) {
                currentSquareCount = currentSquareCount + (currentPointCount * matrix[curRow][curCol] * matrix[startRow][curCol] * matrix[curRow][startCol]);
            }
        }

        curRow = point[0];
        curCol = point[1];
        while (curRow != 1000 && curCol != 1000 )
        {
            curRow++;
            curCol++;
            if (matrix[curRow][curCol] != null && matrix[startRow][curCol] != null && matrix[curRow][startCol] != null) {
                currentSquareCount = currentSquareCount + (currentPointCount * matrix[curRow][curCol] * matrix[startRow][curCol] * matrix[curRow][startCol]);
            }
        }

        curRow = point[0];
        curCol = point[1];
        while (curRow != 0 && curCol != 1000 )
        {
            curRow--;
            curCol++;
            if (matrix[curRow][curCol] != null && matrix[startRow][curCol] != null && matrix[curRow][startCol] != null) {
                currentSquareCount = currentSquareCount + (currentPointCount * matrix[curRow][curCol] * matrix[startRow][curCol] * matrix[curRow][startCol]);
            }
        }

        curRow = point[0];
        curCol = point[1];
        while (curRow != 1000 && curCol != 0 )
        {
            curRow++;
            curCol--;
            if (matrix[curRow][curCol] != null && matrix[startRow][curCol] != null && matrix[curRow][startCol] != null) {
                currentSquareCount = currentSquareCount + (currentPointCount * matrix[curRow][curCol] * matrix[startRow][curCol] * matrix[curRow][startCol]);
            }
        }

        return currentSquareCount;
    }
}