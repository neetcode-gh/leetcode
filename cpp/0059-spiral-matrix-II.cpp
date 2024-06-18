/*
    Given a positive integer n, generate an n x n matrix filled with elements from 1 to n^2 in spiral order.

    Time: O(n^2)
    Space: O(1)
*/

class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        int l = 0;
        int t = 0;
        int r = n - 1;
        int b = n - 1;
        int count = 1;
        vector<vector<int>> res(n, vector<int>(n));
        while((l <= r) and (t <= b)){
            for(int i = l; i <= r; i++){
                res[t][i] = count;
                count++;
            }
            t++;
            for(int i = t; i <= b; i++){
                res[i][r] = count;
                count++;
            }
            r--;
            if(t <= b){
                for(int i = r; i >= l; i--){
                    res[b][i] = count;
                    count++;
                }
                b--;
            }
            if(l <= r){
                for(int i = b; i >= t; i--){
                    res[i][l] = count;
                    count++;
                }
                l++;
            } 
        }
        return res;
    }
};