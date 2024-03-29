public class Solution {
    public int UniquePathsWithObstacles(int[][] obstacleGrid) {
        var rowLength = obstacleGrid.Length;
        var colLength = obstacleGrid[0].Length;

        int[] row = new int[colLength];
        Array.Fill(row, 0);
        row[colLength - 1] = 1;

        for(int i = rowLength - 1; i >= 0; i--)
        {
            for(int j = colLength - 1; j >= 0; j--)
            {
                if(obstacleGrid[i][j] == 1)
                    row[j] = 0;
                else if (j + 1 < colLength) 
                    row[j] = row[j] + row[j + 1];
            }
        }
        return row[0];
    }
}