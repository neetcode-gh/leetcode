public class Solution {
  public int OrangesRotting(int[][] grid)
        {
            if (grid == null || grid[0].Length == 0)
                return 0;

            int r = grid.Length, c = grid[0].Length, fresh = 0, time = 0;

            Queue<(int, int)> q = new Queue<(int, int)>();

            for (int i = 0; i < r; i++)
            {
                for (int j = 0; j < c; j++)
                {
                    if (grid[i][j] == 1)
                        fresh++;
                    else if (grid[i][j] == 2)
                    {
                        q.Enqueue((i, j));
                    };
                }
            }

            if (fresh == 0)
                return 0;

            int[,] dir = new int[,] { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
            while (q.Any())
            {
                time++;
                int size = q.Count;
                for (int i = 0; i < size; i++)
                {
                    var curr = q.Dequeue();
                    for (int j = 0; j < 4; j++)
                    {
                        int row = curr.Item1 + dir[j, 0];
                        int col = curr.Item2 + dir[j, 1];

                        if (row >= 0 && row < r && col >= 0 && col < c && grid[row][col] == 1)
                        {
                            grid[row][col] = 2;
                            q.Enqueue((row, col));
                            fresh--;
                        }
                    }
                }
            }

            return fresh == 0 ? time - 1 : -1;
        }}
