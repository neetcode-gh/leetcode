class Solution {
    int[] parent;

    public int[] findRedundantConnection(int[][] edges) {
        parent = new int[edges.length];
        for (int i = 0; i < edges.length; i++)
            parent[i] = i + 1;

        for (int[] edge : edges) {
            if (find(edge[0]) == find(edge[1]))
                return edge;
            else
                union(edge[0], edge[1]);
        }

        return new int[2];
    }

    public int find(int x) {
        if (x == parent[x - 1])
            return x;
        return find(parent[x - 1]);
    }

    public void union(int x, int y) {
        parent[find(y) - 1] = find(x);
    }
}