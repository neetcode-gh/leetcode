public class Solution {

        public IList<IList<int>> PacificAtlantic(int[][] heights)
        {
            List<IList<int>> res = new();
            int m = heights.Length, n = heights[0].Length;
            bool[,] isPacific = new bool[m, n];
            bool[,] isAtlantic = new bool[m, n];
            for (int row = 0; row < m; row++)
            {
                DFSPacificAtlantic(row, 0, heights, isPacific, heights[row][0]);
                DFSPacificAtlantic(row, n - 1, heights, isAtlantic, heights[row][n - 1]);
            }

            for (int col = 0; col < n; col++)
            {
                DFSPacificAtlantic( 0, col, heights, isPacific, heights[0][col]);
                DFSPacificAtlantic(m-1,col,  heights, isAtlantic, heights[m-1][col]);
            }
            for (int i = 0; i < m; i++)
            {
                for (int j = 0; j < n; j++)
                {
                    if (isAtlantic[i, j] && isPacific[i, j])
                    {
                        res.Add(new List<int> { i, j });
                    }
                }
            }

            return res;
        }

        private void DFSPacificAtlantic(int row, int col, int[][] heights, bool[,] visits, int prev)
        {
            int m = heights.Length, n = heights[0].Length;
            if (row < 0 || row >= m || col < 0 || col >= n || visits[row, col] || heights[row][col] < prev)
                return;
            visits[row, col] = true;
            DFSPacificAtlantic(row, col + 1, heights, visits, heights[row][col]);
            DFSPacificAtlantic(row, col - 1, heights, visits, heights[row][col]);
            DFSPacificAtlantic(row + 1, col, heights, visits, heights[row][col]);
            DFSPacificAtlantic(row - 1, col, heights, visits, heights[row][col]);
        }
}
