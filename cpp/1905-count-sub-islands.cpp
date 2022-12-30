class Solution {
public:
    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        const int ROWS = grid1.size(), COLS = grid1[0].size();
        set<int> visit;
        
        function<bool(int, int)> dfs = [&] (int r, int c) -> bool {
            if (
                r < 0
                || c < 0
                || r == ROWS
                || c == COLS
                || grid2[r][c] == 0
                || visit.count(r*COLS + c)
            )
                return true;
            
            visit.insert(r*COLS + c);
            bool res = true;
            if(grid1[r][c] == 0)
                res = false;
            
            res = dfs(r - 1, c) && res;
            res = dfs(r + 1, c) && res;
            res = dfs(r, c - 1) && res;
            res = dfs(r, c + 1) && res;
            return res;
        };
        
        int count = 0;
        for(int r = 0; r < ROWS; r++)
            for(int c = 0; c < COLS; c++)
                if(grid2[r][c] && !visit.count(r*COLS + c) && dfs(r, c))
                    count += 1;
        return count;
    }
};
