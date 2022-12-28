/*
    Given a 2d matrix if an element is 0, set it's entire row and column to 0 as
    well.
    Ex. matrix = [[ 1,  1,  1],         [[ 1,  0,  1],
                  [ 1,  0,  1],    ->    [ 0,  0,  0],
                  [ 1,  1,  1]]          [ 1,  0,  1]]

    An identical result matrix can be initialised and then updated according to 
    the zeros values in the original matrix. However, this would take O(m*n) 
    space, which can be improved.
    
    By doing the updations in the same matrix, space complexity becomes O(1). We
    reserve the top most row as marker, they will signify whether the 
    corresponding column has a zero or not. Similarly the first column, will do
    the same for the rows. 
    
    An additional variable is needed as the m[0][0] is common in both the first
    row and first column.

    Time: O(m*n) where m, n are the matrix dimensions
    Space: O(1)
*/

void setZeroes(int** matrix, int matrixSize, int* matrixColSize){
    int ROW = matrixSize;
    int COL = *matrixColSize;
    bool rowZero = false;
    
    for (int r = 0; r < ROW; ++r) {
        for (int c = 0; c < COL; ++c) {
            if (matrix[r][c] == 0) {
                matrix[0][c] = 0;
                if (r > 0) 
                    matrix[r][0] = 0;
                else
                    rowZero = true;
            }
        }
    }

    for (int r = 1; r < ROW; ++r) {
        for (int c = 1; c < COL; ++c) {
            if (matrix[0][c] == 0 || matrix[r][0] == 0)
                matrix[r][c] = 0;
        }
    }

    // Set first column as zeros if matrix[0][0] is set
    if (matrix[0][0] == 0) {
        for (int r = 0; r < ROW; ++r) {
            matrix[r][0] = 0;
        }
    }

    // Set first row as zeros if rowZero is true
    if (rowZero) {
        for (int c = 0; c < COL; ++c) {
            matrix[0][c] = 0;
        }
    }
}