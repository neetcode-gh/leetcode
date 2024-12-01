/*------------------------------------
  Time complexity: (m*n)^2
  Space complexity: (m*n)
------------------------------------*/  

class Solution {
    public int minDays(int[][] grid) {
        if(count_lands(grid) != 1)
            return 0;

        for(int r = 0; r < grid.length; r++){
            for(int c = 0; c < grid[r].length; c++){
                if(grid[r][c] == 0)
                    continue;

                grid[r][c] = 0;
                if(count_lands(grid) != 1)
                    return 1;

                grid[r][c] = 1;        
            }
        }

        return 2;
    }
    private void dfs(int[][] grid, int r, int c, Set<String> visited){
        if(r < 0 || c < 0 || r >= grid.length || c >= grid[r].length || grid[r][c] == 0)
            return;

        String pos = r + "," + c;
        if(visited.contains(pos))
            return;

        visited.add(pos);

        dfs(grid, r+1, c, visited);    
        dfs(grid, r, c+1, visited);    
        dfs(grid, r-1, c, visited);    
        dfs(grid, r, c-1, visited);    
    }
    
    private int count_lands(int[][] grid){
        Set<String> visited = new HashSet<>();
        int count = 0;

        for(int r = 0; r < grid.length; r++){
            for(int c = 0; c < grid[r].length; c++){
                if(grid[r][c] == 1 && !visited.contains(r + "," + c)){
                    dfs(grid, r, c, visited);
                    count += 1;
                }
            }
        }

        return count;
    }
}
