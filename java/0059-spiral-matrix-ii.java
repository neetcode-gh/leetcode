class Solution {
    public int[][] generateMatrix(int n) {
        int[][] ans = new int[n][n];

        int r1=0, r2=n-1;
        int c1=0, c2=n-1;
        int elem = 1;
        while(r2>=r1 && c2>=c1){
            for(int i=c1; i<=c2; i++){
                ans[r1][i] = elem++;
            }
            for(int j=r1+1; j<=r2-1; j++){
                ans[j][c2] = elem++;
            }
            if(r2>r1 && c2>c1){
                for (int i = c2; i >= c1; i--){
                    ans[r2][i] = elem++;
                }
                for (int j = r2-1; j>=r1+1; j--){
                    ans[j][c1] = elem++;
                }
            }
            r1++;
            r2--;
            c1++;
            c2--;
        }
        return ans;
    }
}