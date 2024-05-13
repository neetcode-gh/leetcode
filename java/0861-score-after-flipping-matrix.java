class Solution {
    public int matrixScore(int[][] grid) {
        // always flip if bit 1 is 0 for row
        // if a column has more 0's than 1's, flip it.
        int rows = grid.length;
        int cols = grid[0].length;
        // flip columns
        for (int r = 0; r < rows; r++)
        {
            if (grid[r][0] == 0)
            {
                for (int c = 0; c < cols; c++)
                {
                    grid[r][c] = (grid[r][c] == 0) ? 1 : 0;
                }
            }
        }
        // flip the columns
        for (int c = 0;c<cols;c++)
        {
            int count = 0;
            for (int r = 0; r < rows; r++)
            {
                count += grid[r][c];
            }
            if (count < rows - count)
                for (int r = 0; r < rows; r++)
                {
                    grid[r][c] = (grid[r][c] == 0) ? 1 : 0;
                }
        }
        int result = 0;
        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                result += grid[r][c] << (cols - c - 1);
            }
        }
        return result;
    }
}