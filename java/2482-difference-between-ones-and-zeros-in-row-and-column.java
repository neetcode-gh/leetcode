class Solution {
    public int[][] onesMinusZeros(int[][] grid) {
        int r = grid.length, c = grid[0].length;
        int[] onesRow = new int[r];
        int[] onesCol = new int[c];

        for(int i = 0; i < r; i++){
            for(int j = 0; j < c; j++){
                onesRow[i] += grid[i][j];
                onesCol[j] += grid[i][j];
            }
        }

        int[][] res = new int[r][c];
        for(int i = 0; i < r; i++){
            for(int j = 0; j < c; j++){
                int no = 2 * onesRow[i] + 2 * onesCol[j] - r - c;
                res[i][j] = no;
            }
        }
        return res;
    }
}
