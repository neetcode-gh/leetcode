class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        int maxnum=0;
        int trans[10001]={0};
        for(int i:nums){
            trans[i]+=i;
            maxnum=max(maxnum,i);
        }
        int dp[maxnum+1];
        dp[0]=trans[0];
        dp[1]=max(trans[1],trans[0]);
        for(int i=2;i<=maxnum;i++){
            dp[i] = max(dp[i - 1], dp[i - 2] +trans[i]);
        }
        return dp[maxnum];
    }
};
