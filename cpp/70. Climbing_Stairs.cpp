class Solution {
public:
    int dp[50];
    int recur(int n)
    {
        if(n<=3)
            return n ;
        if(dp[n]!=-1)
            return dp[n];
        int op1=recur(n-1);
        int op2=recur(n-2);
        return dp[n]=op1+op2;
    }
    int climbStairs(int n) {
        memset(dp,-1,sizeof dp);
        return recur(n);
    }
};
