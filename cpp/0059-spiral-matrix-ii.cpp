/*
    Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.
    Ex: Input  -> n = 3
        Output -> [[1,2,3],[8,9,4],[7,6,5]]

    Fill matrix layer by layer in four directions.

    Time - O(n^2)
    Space - O(1)
*/

class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        int left = 0, right = n - 1, top = 0, bottom = n - 1;
        int val = 1;
        vector<vector<int>> matrix(n, vector<int> (n));

        while (left <= right && top <= bottom) {
            for (int j = left; j <= right; j++) {
                matrix[top][j] = val++;
            }
            top++;
            
            for (int i = top; i <= bottom; i++) {
                matrix[i][right] = val++;
            }
            right--;
            
            for (int j = right; j >= left; j--) {
                matrix[bottom][j] = val++;
            }
            bottom--;
            
            for (int i = bottom; i >= top; i--) {
                matrix[i][left] = val++;
            }
            left++;
        }
        
        return matrix;
    }
};
