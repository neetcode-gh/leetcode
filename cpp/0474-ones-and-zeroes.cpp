/*

We are given an array of binary strings strs and two integers m and n.
Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.

Ex. strs = ["10","0001","111001","1","0"], m = 5, n = 3
    Output = 4


Explanation:
	The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, 
	so we return 4 as our answer.



Time: O(m*n)
Space: O((m*n) + strs.length))

*/




class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
    vector<pair<int,int>> vp;
    for(auto &s:strs) {
        int z = 0, o = 0;
        for(char &c:s) if(c == '0') z++; else o++;
        vp.push_back({z,o});
    }
    vector<vector<int>> dp(m+1, vector<int>(n+1));
    for(auto &p:vp) {
        int z = p.first, o = p.second;
        for(int i=m; i>=0; i--) {
            for(int j=n; j>=0; j--) {
                if(i-z >=0 && j-o >= 0)
                dp[i][j] = max(dp[i][j], 1 + dp[i-z][j-o]);
            }
        }
    }

    return dp[m][n];
    
    }
};