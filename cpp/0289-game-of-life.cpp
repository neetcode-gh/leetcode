class Solution {
public:
    int cntNei(vector<vector<int>> & g, int r, int c, int rows, int cols){
        int cnt = 0;
        
        for (int i = r - 1; i <= r + 1; i++) {
            for (int j = c - 1; j <= c + 1; j++) {
                if ((i == r && j == c) || i < 0 || j < 0 || i == rows || j == cols) {
                    continue;
                }
                if (g[i][j] == 1 || g[i][j] == 3) {
                    cnt++;
                }
            }
        }

        return cnt;
    }

    void gameOfLife(vector<vector<int>>& g) {
        int rows = g.size();
        int cols = g[0].size();

        for (int r = 0; r < rows; r++){
            for (int c = 0; c < cols; c++){
                int nei = cntNei(g, r, c, rows, cols);

                if (g[r][c] == 1) {
                    // when cell is alive
                    if (nei == 2 || nei == 3) {
                        g[r][c] = 3;
                    }
                } else {
                    // when cell is not alive right now
                    if (nei == 3) {
                        g[r][c] = 2;
                    }
                }
            }
        }

        for (int r = 0; r < rows ; r++){
            for (int c = 0; c < cols; c++){
                if (g[r][c] == 1) {
                    g[r][c] = 0;
                } else if (g[r][c] == 2 || g[r][c] == 3) {
                    g[r][c] = 1;
                }
            }
        }
    }
};
