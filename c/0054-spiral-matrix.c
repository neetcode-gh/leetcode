/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* spiralOrder(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {
    // Allocate the result array and set its size
    int *result = (int*)malloc(sizeof(int) * matrixSize * matrixColSize[0]);
    *returnSize = 0;
    
    // Handle the empty matrix case
    if (matrixSize == 0 || matrixColSize[0] == 0) {
        return result;
    }
    
    // Initialize the boundaries of the matrix
    int top = 0, bottom = matrixSize - 1, left = 0, right = matrixColSize[0] - 1;
    
    // Traverse the matrix in a clockwise spiral order
    while (top <= bottom && left <= right) {
        // Traverse the top row
        for (int col = left; col <= right; col++) {
            *result = matrix[top][col];
            (*returnSize)++;
            result++;
        }
        top++;
        
        // Traverse the right column
        for (int row = top; row <= bottom; row++) {
            *result = matrix[row][right];
            (*returnSize)++;
            result++;
        }
        right--;
        
        // Traverse the bottom row
        if (top <= bottom) {
            for (int col = right; col >= left; col--) {
                *result = matrix[bottom][col];
                (*returnSize)++;
                result++;
            }
            bottom--;
        }
        
        // Traverse the left column
        if (left <= right) {
            for (int row = bottom; row >= top; row--) {
                *result = matrix[row][left];
                (*returnSize)++;
                result++;
            }
            left++;
        }
    }
    
    return result - (*returnSize); // Adjust the pointer back before returning
}
