class Solution {
public:
    vector<vector<int>> shiftGrid(vector<vector<int>>& grid, int k) {
        const int M = grid.size(), N = grid[0].size();
        
        auto posToVal = [&] (int r, int c) -> int {
            return r * N + c;};
        auto valToPos = [&] (int v) -> int* {
            return new int[] {v / N, v % N};};
        
        vector<vector<int>> res;
        for(int r = 0; r < M; r++) {
            vector<int> row;
            for(int c = 0; c < N; c++)
                row.push_back(0);
            res.push_back(row);
        }
        for(int r = 0; r < M; r++)
            for(int c = 0; c < N; c++) {
                int newVal = (posToVal(r, c) + k) % (M * N);
                int *newRC = valToPos(newVal);
                res[newRC[0]][newRC[1]] = grid[r][c];
            }
        return res;
    }
};
