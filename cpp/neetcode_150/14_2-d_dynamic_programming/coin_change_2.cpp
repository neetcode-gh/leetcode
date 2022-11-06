/*
    Given array of coins & an amount, return # of combos that make up this amount
    Ex. amount = 5, coins = [1,2,5] -> 4 (5, 2+2+1, 2+1+1+1, 1+1+1+1+1)

    DFS + memo, 2 choices: either try coin & stay at idx, or don't try & proceed

    Time: O(m x n)
    Space: O(m x n)
*/

class Solution {
public:
    
    int solve(int amount, int i, int sum, vector<int>& coins, vector<vector<int>>& cache) {
        if(sum > amount || i == coins.size())
            return 0;
        
        if(sum == amount) 
            return 1;
        
        if(cache[i][sum] != -1) 
            return cache[i][sum];
        
        cache[i][sum] = solve(amount, i, sum + coins[i], coins, cache) + solve(amount, i + 1, sum, coins, cache);
        return cache[i][sum];
    }
    
    int change(int amount, vector<int>& coins) {
        vector<vector<int>> cache(coins.size(), vector<int>(amount + 1, -1));
        return solve(amount, 0, 0, coins, cache);
    }
    
};
