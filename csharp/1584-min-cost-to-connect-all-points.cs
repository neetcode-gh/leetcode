public class Solution
{
    //T: O(N^2 LogN)
    public int MinCostConnectPoints(int[][] points)
    {
        //creating the ajacency list.
        var N = points.Length;
        var dictionary = new Dictionary<int, List<Tuple<int, int>>>(); //Cost and Node

        if (N == 1)
            return 0;

        for (var i = 0; i < N; i++)
        {
            dictionary.Add(i, new List<Tuple<int, int>>());
        }

        for (var i = 0; i < N; i++)
        {
            var x1 = points[i][0];
            var y1 = points[i][1];

            for (var j = i + 1; j < N; j++)
            {
                var x2 = points[j][0];
                var y2 = points[j][1];

                var dist = Math.Abs(x2 - x1) + Math.Abs(y1 - y2);

                dictionary[j].Add(new Tuple<int, int>(dist, i));
                dictionary[i].Add(new Tuple<int, int>(dist, j));

            }
        }

        var res = 0;
        //Prim's
        var visited = new HashSet<int>();
        var minHeap = new PriorityQueue<(int, int), int>(); // Cost and Node
        minHeap.Enqueue((0, 0), 0);

        while (minHeap.Count > 0)
        {
            var (cost, point) = minHeap.Dequeue();
            if (visited.Contains(point))
                continue;
            res += cost;
            visited.Add(point);
            var adj = dictionary[point];

            for (var i = 0; i < adj.Count; i++)
            {
                if (!visited.Contains(adj[i].Item2))
                    minHeap.Enqueue((adj[i].Item1, adj[i].Item2), adj[i].Item1);
            }
        }

        return res;
    }
}