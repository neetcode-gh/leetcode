int candy(int* ratings, int ratingsSize) {
    int* candies = (int*)malloc(sizeof(int) * ratingsSize);
    
    // Initialize all children with 1 candy
    for (int i = 0; i < ratingsSize; i++) {
        candies[i] = 1;
    }
    
    // First pass: from left to right
    for (int i = 1; i < ratingsSize; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    
    // Second pass: from right to left
    for (int i = ratingsSize - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1]) {
            candies[i] = candies[i + 1] + 1;
        }
    }
    
    // Calculate the total number of candies
    int totalCandies = 0;
    for (int i = 0; i < ratingsSize; i++) {
        totalCandies += candies[i];
    }
    
    free(candies);
    
    return totalCandies;
}
