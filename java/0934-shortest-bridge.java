class Solution {
    public int shortestBridge(int[][] grid) {
        Queue<int[]> q = new LinkedList<>();
        boolean[][] vis = new boolean[grid.length][grid[0].length];
        
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) {
                    mark(grid, vis, q, i, j);
                    i = grid.length;
                    j = grid[0].length;
                }
            }
        }
        int count = 0;
        int[][] dir = {{0,1}, {1,0}, {-1,0}, {0,-1}};
        
        while (!q.isEmpty()) {
            int n = q.size();
            
            for (int k = 0; k < n; k++) {
                int[] curr = q.poll();
                
                for (int j = 0; j < 4; j++) {
                    int r = curr[0] + dir[j][0];
                    int c = curr[1] + dir[j][1];

                    if (r >= 0 && c >= 0 && r < grid.length && c < grid[0].length && !vis[r][c]) {
                        if (grid[r][c] == 1) return count;
                        vis[r][c] = true;
                        q.offer(new int[]{r,c});
                    }
                } 
            }
            count++;
        }
        return -1;
    }

    void mark(int[][] grid, boolean[][] vis , Queue<int[]> q, int i, int j) {
        if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] == 0 || vis[i][j]) return;
        vis[i][j] = true;
        q.add(new int[]{i,j});
        mark(grid, vis, q, i + 1, j);
        mark(grid, vis, q, i - 1, j);
        mark(grid, vis, q, i, j + 1);
        mark(grid, vis, q, i, j - 1);

    } 
}
