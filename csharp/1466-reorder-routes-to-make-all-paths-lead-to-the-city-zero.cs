public class Solution {
  public int MinReorder(int n, int[][] connections)
        {
            if (connections == null || connections?.Length < 2) return 0;

            Dictionary<int, HashSet<int>> paths = new Dictionary<int, HashSet<int>>();
            List<int>[] graph = new List<int>[n];
            foreach (var connection in connections)
            {
                if (!paths.ContainsKey(connection[0]))
                    paths.Add(connection[0], new HashSet<int>());

                paths[connection[0]].Add(connection[1]);

                if (graph[connection[0]] == null)
                    graph[connection[0]] = new List<int>();
                graph[connection[0]].Add(connection[1]);

                if (graph[connection[1]] == null)
                    graph[connection[1]] = new List<int>();
                graph[connection[1]].Add(connection[0]);
            }
            int cnt = 0;
            HashSet<int> visited = new HashSet<int>();
            DFSMinReorder(graph, 0, paths, visited, ref cnt);
            return cnt;
        }

        private void DFSMinReorder(List<int>[] graph, int u, Dictionary<int, HashSet<int>> paths, HashSet<int> visited, ref int cnt)
        {
            visited.Add(u);

            if (graph[u] != null)
            {
                foreach (var v in graph[u])
                {
                    if (!visited.Contains(v))
                    {
                        if (paths.ContainsKey(u) && paths[u].Contains(v))
                            cnt++;

                        DFSMinReorder(graph, v, paths, visited, ref cnt);
                    }
                }
            }
        }
}
