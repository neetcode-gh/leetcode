/*
    Search for target value in matrix where every row & col is sorted

    Perform 2 binary searches: 1 to find row, then another to find col

    Time: O(log m + log n)
    Space: O(1)
*/

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int lowRow = 0;
        int highRow = matrix.size() - 1;
        
        while (lowRow < highRow) {
            int mid = lowRow + (highRow - lowRow) / 2;
            if (matrix[mid][0] == target) {
                return true;
            }
            if (matrix[mid][0] < target && target < matrix[mid + 1][0]) {
                lowRow = mid;
                break;
            }
            if (matrix[mid][0] < target) {
                lowRow = mid + 1;
            } else {
                highRow = mid - 1;
            }
        }
        
        int lowCol = 0;
        int highCol = matrix[0].size() - 1;
        
        while (lowCol <= highCol) {
            int mid = lowCol + (highCol - lowCol) / 2;
            if (matrix[lowRow][mid] == target) {
                return true;
            }
            if (matrix[lowRow][mid] < target) {
                lowCol = mid + 1;
            } else {
                highCol = mid - 1;
            }
        }
        
        return false;
    }
};

// Same approach with implicit array linearization
// T(n) = O(log_2(mn)) = O(log_2(m) + log_2(n))
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {

        int left = 0;
        int m = matrix.size();
        int n = matrix[0].size();
        int right = m * n - 1;

        while (left <= right){

            int middle = right + (left - right) / 2;

            // compute sub-indices using matrix structure
            int row = middle / n;
            int col = middle % n; 


            //ordinary binary search
            int middle_x = matrix[row][col];
            if (target > middle_x){
                left = ++middle;
            } else if (target < middle_x){
                right = --middle;
            } else {
                return true;
            }


        }

        return false;
        
    }
};
