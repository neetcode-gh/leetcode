class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        vector<vector<int>> result;
        int rows = heights.size(), cols = heights[0].size();
        set<vector<int>> atlantic, pacific;
        
        for (int c = 0; c < cols; c++) {
            dfs(0, c, pacific, heights[0][c], heights);
            dfs(rows-1, c, atlantic, heights[rows-1][c], heights);
        }
        
        for (int r = 0; r < rows; r++) {
            dfs(r, 0, pacific, heights[r][0], heights);
            dfs(r, cols - 1, atlantic, heights[r][cols-1], heights);
        }
        
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (pacific.find({r,c}) != pacific.end() &&
                    atlantic.find({r,c}) != atlantic.end()) {
                    result.push_back({r,c});
                }
            }
        }
        
        return result;  
    }
    
private:
    void dfs(int r, int c, set<vector<int>> &visited, int previousHeight, vector<vector<int>>& heights) {
        int rows = heights.size(), cols = heights[0].size();
        if (visited.find({r, c}) != visited.end() ||
                r < 0 || c < 0 || r == rows || c == cols ||
                heights[r][c] < previousHeight) {
            return;
        }
        
        visited.insert({r,c});
        
        dfs(r+1, c, visited, heights[r][c], heights);
        dfs(r-1, c, visited, heights[r][c], heights);
        dfs(r, c+1, visited, heights[r][c], heights);
        dfs(r, c-1, visited, heights[r][c], heights);
    }
};