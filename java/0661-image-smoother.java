class Solution {
    public int[][] imageSmoother(int[][] img) {
        int ROWS = img.length, COLS = img[0].length;
        int[][] res = new int[ROWS][COLS];

        for(int r = 0; r < ROWS; r++){
            for(int c = 0; c < COLS; c++){
                int total = 0, cnt = 0;
                for(int i = r - 1; i < r + 2; i++){
                    for(int j = c - 1; j < c + 2; j++){
                        if(i < 0 || i == ROWS || j < 0 || j == COLS)
                            continue;
                        total += img[i][j];
                        cnt += 1;    
                    }
                }
                res[r][c] = total / cnt;
            }
        }
        return res;
    }
}

//  Optimal  Solution

class Solution {
    public int[][] imageSmoother(int[][] img) {
        int ROWS = img.length, COLS = img[0].length;

        for(int r = 0; r < ROWS; r++){
            for(int c = 0; c < COLS; c++){
                int total = 0, cnt = 0;

                for(int i = r - 1; i < r + 2; i++){
                    for(int j = c - 1; j < c + 2; j++){
                        if(i < 0 || i == ROWS || j < 0 || j == COLS)
                            continue;
                        total += img[i][j] % 256;
                        cnt += 1;    
                    }
                }
                img[r][c] = img[r][c] ^ (total / cnt) << 8;
            }
        }
        for(int r = 0; r < ROWS; r++){
            for(int c = 0; c < COLS; c++){
                img[r][c] = img[r][c] >> 8;
            }
        }
        return img;
    }
}
