/*
Given an integer n, return the number of structurally unique BST's 
(binary search trees) which has exactly n nodes of unique values from 1 to n.

Space: O(n)
Time: O(n²)
*/

int numTrees(int n){
    int* dp = (int*)malloc(sizeof(int)*(n+1));
    dp[0]=dp[1]=1;
    for (int i=2; i<(n+1); i++){
        dp[i] = 0;
        for (int j=1; j<(i+1); j++){
            dp[i]+=dp[j-1]*dp[i-j];
        }
    }
    // We could free dp
    return dp[n];
}
