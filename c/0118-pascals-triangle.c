/*
Given an integer numRows, return the first numRows of Pascal's triangle.

Space: O(n²) (n=numRows)
Time: O(n²)
*/

int** generate(int numRows, int* returnSize, int** returnColumnSizes){
    *returnSize = numRows;
    (*returnColumnSizes) = malloc(sizeof(int*)*numRows);
    int** ans = malloc(sizeof(int*)*numRows);
    for (int i=0; i<numRows; i++) {
        (*returnColumnSizes)[i] = i+1;
        ans[i] = malloc(sizeof(int)*(i+1));
        ans[i][0] = 1;
        ans[i][i] = 1;
    }
    for (int i=2; i<numRows; i++) {
        for (int j=1; j<i; j++) {
            ans[i][j] = ans[i-1][j-1] + ans[i-1][j];
        }
    }
    return ans;
}
