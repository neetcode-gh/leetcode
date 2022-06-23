class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] matrix) {
        List<List<Integer>> result = new ArrayList<>();
        int row = matrix.length;
        if (row == 0)
            return result;
        int col = matrix[0].length;
        boolean [][] pacific = new boolean [row][col];
        boolean [][] atlantic = new boolean [row][col];
        // go through every single position in the first row
        for (int i=0; i<col; i++) {
            //run dfs on first row
            dfs(matrix, 0, i, matrix[0][i], pacific);
            //run dfs on last row
            dfs(matrix, row-1, i, matrix[row-1][i], atlantic);
        }
        // get the position in most left column
        for (int i=0; i<row; i++) {
            dfs(matrix, i, 0, matrix[i][0], pacific);
            dfs(matrix, i, col-1, matrix[i][col-1], atlantic);
        }
        for (int i=0; i<row; i++) {
            for (int j=0; j<col; j++) {
                // if the position is visited in both the Pacific and Atlantic oceans, we add to the result
                if (pacific[i][j] && atlantic[i][j]) {
                    List<Integer> currentResult = new ArrayList<>();
                    currentResult.add(i);
                    currentResult.add(j);
                    result.add(currentResult);
                }
            }
        }
        return result;
    }
    
    public void dfs(int [][] matrix, int r, int c, int preHeight, boolean [][] visited) {
        if (r < 0 || c < 0 || r >= matrix.length || c >= matrix[0].length || preHeight > matrix[r][c] || visited[r][c])
            return;
        visited[r][c] = true;
        dfs(matrix, r+1, c, matrix[r][c], visited);
        dfs(matrix, r-1, c, matrix[r][c], visited);
        dfs(matrix, r, c+1, matrix[r][c], visited);
        dfs(matrix, r, c-1, matrix[r][c], visited);
    }
}