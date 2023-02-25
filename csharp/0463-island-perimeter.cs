public class Solution {
int perimeter = 0;
        public int IslandPerimeter(int[][] grid)
        {
            if (grid?.Length == 0)
                return 0;

            bool[,] visits = new bool[grid.Length, grid[0].Length];

            for (int i = 0; i < grid.Length; i++)
            {
                for (int j = 0; j < grid[0].Length; j++)
                {
                    if (grid[i][j] == 1)
                    {
                        return DfsIslandPerimeter(grid, visits, i, j);
                    }
                }

            }

            return perimeter;
        }

        public int DfsIslandPerimeter(int[][] grid, bool[,] visits, int i, int j)
        {
              if (i < 0 || i >= grid.Length || j < 0 || j >= grid[0].Length || grid[i][j] == 0)
            {
                return 1;
            }
            if (visits[i, j])
            {
                return 0;
            }
            visits[i, j] = true; //to mark it as visited in iteration.
            perimeter = DfsIslandPerimeter(grid, visits, i, j + 1);
            perimeter += DfsIslandPerimeter(grid, visits, i + 1, j);
            perimeter += DfsIslandPerimeter(grid, visits, i, j - 1);
            perimeter += DfsIslandPerimeter(grid, visits, i - 1, j);
            return perimeter;
        }
}
