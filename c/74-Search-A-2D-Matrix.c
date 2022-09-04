/*
    Given a 2d matrix, where,
    1. the rows are sorted from left to right,
    2. the last element of each row is less than first element of next row
    
    Find an efficient method to search for a given element in this array
    Ex. matrix = [[ 1,  3,  5,  7],
                  [10, 11, 16, 20],
                  [23, 30, 34, 60]], 
                target = 3 -> true (3 exists)

    The 2D matrix can be thought of as a 1D array if the rows are arranged
    sequentially. And given the conditions, the 1D array will also be sorted. 
    So, binary search can be used to solve this problem with indexes (row, col)
    rather than one.

    Time: O(log(mn))
    Space: O(1)
*/

bool searchMatrix(int** matrix, int matrixSize, int* matrixColSize, int target){
    int m = matrixSize;
    int n = *matrixColSize;
    
    int low = 0;
    int high = m*n - 1;

    int mid = low + (high - low)/2;


    while (low <= high) {
        int row = mid / n;
        int col = mid % n;

        if (matrix[row][col] > target) 
            high = mid - 1;
        else if (matrix[row][col] < target) 
            low = mid + 1;
        else
            return true;
        mid = low + (high - low)/2;

    }
    
    return false;
    
}
