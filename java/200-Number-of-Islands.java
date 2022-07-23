class Solution {

    public int numIslands(char[][] grid) {
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    dfs(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }

    public void dfs(char[][] grid, int i, int j) {
        if (
            i < 0 ||
            j < 0 ||
            i >= grid.length ||
            j >= grid[0].length ||
            grid[i][j] == '0'
        ) {
            return;
        }
        grid[i][j] = '0';
        dfs(grid, i + 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i - 1, j);
        dfs(grid, i, j - 1);
    }

    public int numIslandsUnionFind(char[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        UnionFind uf = new UnionFind(grid);
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};

        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == '1') {
                    for (int[] dir : dirs) {
                        int x = dir[0] + i;
                        int y = dir[1] + j;

                        if (isSafe(grid, x, y)) {
                            int id1 = i*n + j;
                            int id2 = x*n + y;

                            uf.union(id1, id2);
                        }
                    }
                }

        return uf.count();
    }

    private boolean isSafe(char[][] grid, int x, int y) {
        int m = grid.length;
        int n = grid[0].length;
        return x >= 0 && x < m && y >= 0 && y < n && grid[x][y] != '0';
    }

    class UnionFind {
        private int count;
        private int[] parent, size;

        public UnionFind(char[][] grid) {
            int m = grid.length, n = grid[0].length;
            parent = new int[m*n];

            for (int i = 0; i < m; i++)
                for (int j = 0; j < n; j++) {
                    if (grid[i][j] == '1') {
                        int id = i*n + j;
                        parent[id] = id;
                        count++;
                    }
                }
        }

        public int find(int p) {
            while(p != parent[p]) {
                parent[p] = parent[parent[p]];
                p = parent[p];
            }

            return p;
        }

        public boolean union(int p, int q) {
            int root1 = find(p);
            int root2 = find(q);

            if (root1 == root2)
                return false;

            parent[root1] = root2;
            count--;

            return true;
        }

        public int count() {
            return count;
        }
    }
}
