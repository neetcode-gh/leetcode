public class Solution {
    public int CountSubIslands(int[][] grid1, int[][] grid2)
        {
            int r = grid1.Length, c = grid1[0].Length, subIslands = 0;
            for (int i = 0; i < r; i++)
            {
                for (int j = 0; j < c; j++)
                {
                    if (grid2[i][j] == 1 && DfsSubIsLand(grid1, grid2, i, j))
                    {
                        subIslands++;
                    }
                }
            }
            return subIslands;
        }

        private bool DfsSubIsLand(int[][] grid1, int[][] grid2, int r, int c)
        {
            if (r < 0 || c < 0 || r >= grid2.Length || c >= grid2[r].Length || grid2[r][c] == 0) { return true; }

            grid2[r][c] = 0;
            bool stillASubIsland = true;
             stillASubIsland &= DfsSubIsLand(grid1, grid2, r-1, c);
            stillASubIsland &= DfsSubIsLand(grid1, grid2, r, c+1);
            stillASubIsland &= DfsSubIsLand(grid1, grid2, r+1, c);
            stillASubIsland &= DfsSubIsLand(grid1, grid2, r, c-1); 
            return stillASubIsland && grid1[r][c] == 1;
        }
}
