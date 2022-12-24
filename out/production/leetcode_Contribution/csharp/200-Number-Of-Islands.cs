public class Solution {
    public int NumIslands(char[][] grid) {
        var m = grid.Length;
        var n = grid[0].Length;
        var visited = new bool[m, n];
        var numIslands = 0;
        
        
        void dfs(int i, int j, char[][] grid) {
            if(i < 0 || i >=m) return;
            if(j < 0 || j >=n) return;
            if(visited[i, j] == true || grid[i][j]== '0') return;
        
            visited[i, j] = true;
            
            dfs(i + 1, j, grid);
            dfs(i - 1, j, grid);
            dfs(i, j - 1, grid);
            dfs(i, j + 1, grid);
        }
        
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(visited[i,j] == false 
                   && grid[i][j] == '1') {
                    numIslands++;
                    dfs(i, j, grid);
                }
            }
        }
        return numIslands;
        
    }
}