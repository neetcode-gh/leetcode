public class Solution {
    PriorityQueue<(int, int), int> pq;
        private HashSet<(int, int)> visited;
        public int SwimInWater(int[][] grid)
        {
            int n = grid.Length;
            pq = new PriorityQueue<(int, int), int>();
            visited = new HashSet<(int, int)>();
            pq.Enqueue((0, 0), grid[0][0]);
            while (pq.TryDequeue(out var nei, out var priority))
            {
                int r = nei.Item1;
                int c = nei.Item2;
                visited.Add((r, c));

                if (r == n - 1 && c == n - 1) return priority;
                EnQueue(r + 1, c, grid, priority);
                EnQueue(r - 1, c, grid, priority);
                EnQueue(r, c + 1, grid, priority);
                EnQueue(r, c - 1, grid, priority);
            }
            return -1;
        }

        private void EnQueue(int r, int c, int[][] grid, int preCost)
        {
            if (r >= grid.Length || r < 0) return;
            if (c >= grid.Length || c < 0) return;
            if (visited.Contains((r, c))) return;

            pq.Enqueue((r, c), Math.Max(preCost, grid[r][c]));
        }
}
