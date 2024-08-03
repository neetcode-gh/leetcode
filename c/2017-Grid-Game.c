// Function to return the maximum of two values
long long max(long long a, long long b) {
    if (b < a) {
        return a;
    }
    return b;
}

// Function to calculate the maximum score in the grid game
long long gridGame(int** grid, int gridSize, int* gridColSize) {
    // Initialize sums for the bottom row and the top row
    long long sumdown = 0;
    long long sumup = 0;

    // Calculate the sum of all cells in the bottom row except the last column
    for (int i = 0; i < gridColSize[0] - 1; i++) {
        sumdown += grid[1][i];
    }  // sumdown is now the sum of the bottom row except the last column

    // Initialize the answer with the current sumdown value
    long long ans = sumdown;

    // Iterate over the columns from right to left
    for (int i = gridColSize[0] - 1; i > 0; i--) {
        // Update the answer with the maximum of the current sumdown and sumup
        if (max(sumdown, sumup) < ans) {
            ans = max(sumdown, sumup);
        }

        // Add the current column value from the top row to sumup
        sumup += grid[0][i];

        // Subtract the previous column value from the bottom row from sumdown
        sumdown -= grid[1][i - 1];
    }

    // Return the smaller value between sumup and ans, which represents the case
    // where the red player takes the entire top row (first column to last column)
    if (sumup < ans) {
        return sumup;  // The case where the answer is the whole top row
    }

    return ans;  // Return the maximum score
}
