
/**
 * Return an array of arrays of size *returnSize.
 * The sizes of the arrays are returned as *returnColumnSizes array.
 * Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().
 */


// An array to traverse all 4 diagonal directions on the chessboard.
int diagonals[][2] = {{1, -1}, {1, 1}, {-1, 1}, {-1, -1}};

// A result-stack to store all possible n-queen solutions at a time on a stack during backtracking.
struct result_stack {
    char** chessboard;
    struct result_stack* next;
};

// A Node() function to create a new stack node.
struct result_stack* Node() {
    struct result_stack* node = (struct result_stack*)malloc(sizeof(struct result_stack));
    node -> next = NULL;
    node -> chessboard = NULL;
    return node;
}

// toggle_queen() function to place and remove any queen on the chessboard by passing in the toggle parameter as 1 or -1. 
// toggle == 1 to place a queen at (row, col) on the chessboard. Similarly toggle == -1 to remove a queen from the board.
void toggle_queen(char** chessboard, int n, int row, int col, char toggle) {

    for (int i = 0; i < n; i++) chessboard[row][i] += toggle;
    for (int j = 0; j < n; j++) chessboard[j][col] += toggle;

    for (int x; x < 4; x++) {
        int i = row + diagonals[x][0];
        int j = col + diagonals[x][1];
        while (i >= 0 && i < n && j >= 0 && j < n) {
            chessboard[i][j] += toggle;
            i += diagonals[x][0];
            j += diagonals[x][1];
        }
    }
    chessboard[row][col] -= 3 * toggle;
}

// copy_board() function to copy each possible solution from the chessboard during backtracking.
char** copy_board(char** chessboard, int n) {

    char** copy = (char**)malloc(n * sizeof(char*));
    for(int i = 0; i < n; i++) {
        copy[i] = (char*)malloc((n + 1) * sizeof(char));
        for(int j = 0; j < n; j++) {
            chessboard[i][j] == -1 ? (copy[i][j] = 'Q') : (copy[i][j] = '.');
        }
        copy[i][n] = '\0';
    } 
    return copy;
}

// Recursive backtracking method to go through all possible queen placements on the chessboard.
int backtrack(struct result_stack* stack, char** chessboard, int n, int row) {

    if (row == n) {
        // Push the solution to the stack.
        struct result_stack* node = Node(); // create a new stack node for a solution.
        node -> chessboard = copy_board(chessboard, n);
        node -> next = stack -> next;
        stack -> next = node;
        return 1;
    }

    int result_size = 0;
    for (int col = 0; col < n; col++) {
        if (chessboard[row][col] == 0) {
            // Place the queen with toggle = 1.
            toggle_queen(chessboard, n, row, col, 1);
            result_size += backtrack(stack, chessboard, n, row + 1);
            // Backtrack by removing the queen with toggle = -1.
            toggle_queen(chessboard, n, row, col, -1);
        }
    }
    return result_size;
}


char *** solveNQueens(int n, int* returnSize, int** returnColumnSizes){

    // Create a N x N chessboard for checking all possible queen placement scenarios. 
    char** chessboard = (char**)malloc(n * sizeof(char*));
    for(int i = 0; i < n; i++) {
        chessboard[i] = (char*)malloc(n * sizeof(char));
        for(int j = 0; j < n; j++) {
            chessboard[i][j] = 0;
        }
    } 

    // Create an empty stack to collect all possible n-queen solutions during backtracking.
    struct result_stack* stack = Node();

    // The Backtrack() method will find all possible solutions and stores them on the stack. 
    // Then returns the total size of the result, which is the total number of possible n-queen solutions. 
    *returnSize = backtrack(stack, chessboard, n, 0);

    // prepare the result array using the *returnSize obtained from backtracking.
    char*** result = (char***)malloc(*returnSize * sizeof(char**));
    *returnColumnSizes = (int*)malloc(*returnSize * sizeof(int));

    // Pop every n-queen solution from the stack and assign them to the result array. 
    for (int i = 0; i < *returnSize; i++) {
        returnColumnSizes[0][i] = n;
        result[i] = stack -> next -> chessboard;
        struct result_stack* deletenode = stack -> next;
        stack -> next = stack -> next -> next;
        // free up each stack node after every solution.
        free(deletenode);
    }
    //free up the stack.
    free(stack);

    // free up the chessboard.
    for (int row = 0; row < n; row++) {
        free(chessboard[row]);
    }
    free(chessboard);

    return result;
}