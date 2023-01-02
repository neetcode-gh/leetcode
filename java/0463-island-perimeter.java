class Solution {
    class RecursiveBiFunction<A, B, C> {
        BiFunction<A, B, C> func;
    }
    
    public int islandPerimeter(int[][] _grid) {
        final int[][] grid = _grid;
        final Set<Integer> visit = new HashSet<>();
        
        final RecursiveBiFunction<Integer, Integer, Integer> dfs = new RecursiveBiFunction();
        dfs.func = (i, j) -> {
            if(i >= grid.length || j >= grid[0].length || i < 0 || j < 0 || grid[i][j] == 0)
                return 1;
            //convert 2D-Coordinate to 1D-Coordinate
            int flatCoord = i*grid[0].length + j;
            if(visit.contains(flatCoord))
                return 0;
            
            visit.add(flatCoord);
            int perim = dfs.func.apply(i, j + 1);
            perim += dfs.func.apply(i + 1, j);
            perim += dfs.func.apply(i, j - 1);
            perim += dfs.func.apply(i - 1, j);
            return perim;
        };
        
        for(int i = 0; i < grid.length; i++)
            for(int j = 0; j < grid[0].length; j++)
                if(grid[i][j] != 0)
                    return dfs.func.apply(i, j);
        return -1;
    }
}
