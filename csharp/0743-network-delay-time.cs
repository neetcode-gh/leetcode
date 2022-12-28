public class Solution {
    public int NetworkDelayTime(int[][] times, int n, int k) {
      List<(int node, int weight)>[] adjList = new List<(int node, int weight)>[n + 1];

            for (var i = 0; i <= n; i++)
            {
                adjList[i] = new List<(int node, int wht)>();
            }

            foreach (var time in times)
            {
                adjList[time[0]].Add((time[1], time[2]));
            }

            int[] visited = new int[n + 1];
            Array.Fill(visited, 0);
            PriorityQueue<int, int> queue = new();

            queue.Enqueue(k, 0);
            int res = 0; 
            while (queue.TryDequeue(out int node, out int weight))
            {
                if (visited[node] == 1) continue; 
                visited[node] = 1;
                res = Math.Max(res, weight);
                foreach (var adj in adjList[node])
                {
                    var totalWT = weight + adj.weight;
                    queue.Enqueue(adj.node, totalWT);
                }
            }

            int? visitedCount = visited.Where(e => e == 1)?.Count();
            return visitedCount == n ? res : -1;
    }
}
