public class Solution {
   public bool ValidTree(int n, int[][] edges)
        {
            if (n == 0) return true;

            var adj = new HashSet<int>[n];

            for (int i = 0; i < n; i++)
            {
                adj[i] = new HashSet<int>();
            }
            foreach (var edge in edges)
            {
                var e1 = edge[0];
                var e2 = edge[1];
                adj[e1].Add(e2); adj[e2].Add(e1);
            }
            var visited = new bool[n];

            var res = DfsValidTree(adj, 0, visited);

            if (visited.Any(c => !c)) return false;
            return res;
        }

        private bool DfsValidTree(HashSet<int>[] adj, int current, bool[] visited)
        {
            if (visited[current]) return false;
            visited[current] = true;

            var nextLevel = adj[current];
            foreach (var level in nextLevel)
            {
                adj[level].Remove(current);
                if (!DfsValidTree(adj, level, visited))
                {
                    return false;
                }
            }
            return true;
        }}
