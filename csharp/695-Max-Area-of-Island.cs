public class Solution {
    public int MaxAreaOfIsland(int[][] grid)
        {
            int r = grid.Length, c = grid[0].Length, area = 0;

            bool[,] visits = new bool[r, c];
            for (int i = 0; i < r; i++)
            {
                for (int j = 0; j < c; j++)
                {
                    area = Math.Max(area, DFSMaxAreaOfIsland(i, j, grid, visits));
                }
            }

            return area;
        }

        private int DFSMaxAreaOfIsland(int row, int col, int[][] grid, bool[,] visits)
        {
            int m = grid.Length, n = grid[0].Length;
            if (row < 0 || row >= m || col < 0 || col >= n || visits[row, col] || grid[row][col] == 0)
                return 0;
            visits[row, col] = true;
            return (1 + DFSMaxAreaOfIsland(row, col + 1, grid, visits) +
             DFSMaxAreaOfIsland(row, col - 1, grid, visits) +
             DFSMaxAreaOfIsland(row + 1, col, grid, visits) +
             DFSMaxAreaOfIsland(row - 1, col, grid, visits));
        }}
