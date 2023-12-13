class Solution {
    public int numSpecial(int[][] mat) {
        int r = mat.length;
        int c = mat[0].length;
        int[] rowOnes = new int[r];
        int[] colOnes = new int[c];

        for(int i = 0; i < r; i++){
            for(int j = 0; j < c; j++){
                if(mat[i][j] == 1){
                    rowOnes[i]++;
                    colOnes[j]++;
                }
            }
        }

        int res = 0;
        for(int i = 0; i < r; i++){
            for(int j = 0; j < c; j++){
                if(mat[i][j] == 1 && rowOnes[i] == 1 && colOnes[j] == 1){
                    res++;
                }
            }
        }
        return res;
    }
}
