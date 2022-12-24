public class Solution {
     private int noOfConnectedComponents = 0;
        private int[] rank;

        public int CountComponents(int n, int[][] edges)
        {
            if (n == 0)
                return noOfConnectedComponents;

            noOfConnectedComponents = n;
            rank = new int[n];

            for (int i = 0; i < n; i++)
                rank[i] = i;

            foreach (int[] edge in edges)
                Union(edge[0], edge[1]);

            return noOfConnectedComponents;
        }

        private void Union(int x, int y)
        {
            int p1 = Find(x), p2 = Find(y);

            if (p1 != p2)
            {
                rank[p1] = p2;
                noOfConnectedComponents--;
            }
        }

        private int Find(int n)
        {
            if (rank[n] != n)
                rank[n] = Find(rank[n]);

            return rank[n];
        }
}
