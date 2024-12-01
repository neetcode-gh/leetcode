class Solution {
  public int shortestPathBinaryMatrix(int[][] grid) {
    int n = grid.length;
    Queue<Integer[]> q = new LinkedList<>();
    q.add(new Integer[]{0, 0, 1}); // row, col, length
    
    boolean[][] visited = new boolean[n][n];
    visited[0][0] = true;
    
    int[][] direct = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}, {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};

    while (!q.isEmpty()) {
      Integer[] curr = q.poll();
      int r = curr[0];
      int c = curr[1];
      int length = curr[2];
      
      // out of bounds or no way further
      if (Math.min(r, c) < 0 || Math.max(r, c) == n || grid[r][c] == 1) continue;
      
      if (r == n - 1 && c == n - 1) return length;
      
      for (int[] d : direct) {
        int newRow = r + d[0];
        int newCol = c + d[1];
        if (Math.min(newRow, newCol) >= 0 && Math.max(newRow, newCol) < n && !visited[newRow][newCol]) {
          q.add(new Integer[]{newRow, newCol, 1 + length});
          visited[newRow][newCol] = true;
        }
      }
    }
    return -1;
  }
  
}
