/*
    Given matrix, return length of longest increasing path
    Ex. matrix = [[9,9,4],[6,6,8],[2,1,1]] -> 4, [1,2,6,9]

    DFS + memo, cache on indices, compare to prev for increasing check

    Time: O(m x n)
    Space: O(m x n)
*/

class Solution {
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        int m = matrix.size();
        int n = matrix[0].size();
        
        int result = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                result = max(result, dfs(matrix, -1, i, j, m, n));
            }
        }
        
        return result;
    }
private:
    // {(i, j) -> longest increasing path at (i, j)}
    map<pair<int, int>, int> dp;
    
    int dfs(vector<vector<int>>& matrix, int prev, int i, int j, int m, int n) {
        if (i < 0 || i >= m || j < 0 || j >= n || matrix[i][j] <= prev) {
            return 0;
        }
        if (dp.find({i, j}) != dp.end()) {
            return dp[{i, j}];
        }
        
        int result = 1;
        result = max(result, 1 + dfs(matrix, matrix[i][j], i - 1, j, m, n));
        result = max(result, 1 + dfs(matrix, matrix[i][j], i + 1, j, m, n));
        result = max(result, 1 + dfs(matrix, matrix[i][j], i, j - 1, m, n));
        result = max(result, 1 + dfs(matrix, matrix[i][j], i, j + 1, m, n));
        dp[{i, j}] = result;
        
        return dp[{i, j}];
    }
};


// Solution using a matrix instead of a map to lower the time complexity
// (since map is implemented as a tree and takes O(log n) for insertion/search
class Solution2 {
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        int n = matrix.size();
        int m = matrix[0].size();
        vector<vector<int>> DP(n, vector<int>(m, -1));
        int maxLen = 0;

        for (int i = 0; i < n; ++i)
            for (int j = 0; j < m; ++j)
                maxLen = max(maxLen, dfs(matrix, i, j, DP, -1));

        return maxLen;
    }
private:
    int dfs(vector<vector<int>>& matrix, int i, int j, vector<vector<int>>& DP, int prev){
        if (i < 0 || i >= matrix.size() || j < 0 || j >= matrix[0].size() || matrix[i][j] <= prev)
            return 0;
        
        if (DP[i][j] != -1)
            return DP[i][j];
        
        int res = 1;
        res = max(res, 1 + dfs(matrix, i+1, j, DP, matrix[i][j]));
        res = max(res, 1 + dfs(matrix, i-1, j, DP, matrix[i][j]));
        res = max(res, 1 + dfs(matrix, i, j+1, DP, matrix[i][j]));
        res = max(res, 1 + dfs(matrix, i, j-1, DP, matrix[i][j]));
        DP[i][j] = res;

        return DP[i][j];
    }
};

