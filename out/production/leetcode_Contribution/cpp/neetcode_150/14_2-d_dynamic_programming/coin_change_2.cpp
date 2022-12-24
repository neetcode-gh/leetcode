/*
    Given array of coins & an amount, return # of combos that make up this amount
    Ex. amount = 5, coins = [1,2,5] -> 4 (5, 2+2+1, 2+1+1+1, 1+1+1+1+1)

    DFS + memo, 2 choices: either try coin & stay at idx, or don't try & proceed

    Time: O(m x n)
    Space: O(m x n)
*/
/*
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        return dfs(amount, coins, 0, 0);
    }
private:
    // {(index, sum) -> # of combos that make up this amount}
    map<pair<int, int>, int> dp;
    
    int dfs(int amount, vector<int>& coins, int i, int sum) {
        if (sum == amount) {
            return 1;
        }
        if (sum > amount) {
            return 0;
        }
        if (i == coins.size()) {
            return 0;
        }
        if (dp.find({i, sum}) != dp.end()) {
            return dp[{i, sum}];
        }
        
        dp[{i, sum}] = dfs(amount, coins, i, sum + coins[i])
                     + dfs(amount, coins, i + 1, sum);
        
        return dp[{i, sum}];
    }
};
*/
// DP programming solution using a matrix
/*
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<vector<int>> DP(coins.size() + 1, vector<int>(amount+1));
        
        for (int i = 0; i < coins.size() + 1; ++i)
            DP[i][0] = 1;

        for (int i = 1; i <= coins.size(); ++i){
            for (int j = 0; j <= amount; ++j){
                DP[i][j] = DP[i-1][j];
                if (j - coins[i-1] >= 0)
                    DP[i][j] +=  DP[i][j - coins[i-1]];
            }
        }

        return DP[coins.size()][amount];
    }
};
// O(m) space solution
*/
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> prev(amount+1);
        vector<int> curr(amount+1);

        prev[0] = 1;

        for (int i = 0; i < coins.size(); ++i){
            for (int j = 0; j <= amount; ++j){
                curr[j] = prev[j];
                if (j - coins[i] >= 0)
                    curr[j] +=  curr[j - coins[i]];
            }
            prev = curr;
        }

        return curr[amount];
    }
};
