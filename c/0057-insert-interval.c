int** insert(int** intervals, int intervalsSize, int* intervalsColSize, int* newInterval, int newIntervalSize, int* returnSize, int** returnColumnSizes) {
    // Create a result array to store the merged intervals
    int** result = (int**)malloc(sizeof(int*) * (intervalsSize + 1));
    *returnColumnSizes = (int*)malloc(sizeof(int) * (intervalsSize + 1));
    
    int i = 0, j = 0;
    
    // Add intervals that end before the new interval starts
    while (i < intervalsSize && intervals[i][1] < newInterval[0]) {
        result[j] = (int*)malloc(sizeof(int) * 2);
        result[j][0] = intervals[i][0];
        result[j][1] = intervals[i][1];
        (*returnColumnSizes)[j] = 2;
        j++;
        i++;
    }
    
    // Merge overlapping intervals
    while (i < intervalsSize && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = (newInterval[0] < intervals[i][0]) ? newInterval[0] : intervals[i][0];
        newInterval[1] = (newInterval[1] > intervals[i][1]) ? newInterval[1] : intervals[i][1];
        i++;
    }
    
    // Add the merged interval
    result[j] = (int*)malloc(sizeof(int) * 2);
    result[j][0] = newInterval[0];
    result[j][1] = newInterval[1];
    (*returnColumnSizes)[j] = 2;
    j++;
    
    // Add remaining intervals
    while (i < intervalsSize) {
        result[j] = (int*)malloc(sizeof(int) * 2);
        result[j][0] = intervals[i][0];
        result[j][1] = intervals[i][1];
        (*returnColumnSizes)[j] = 2;
        j++;
        i++;
    }
    
    // Update the return size
    *returnSize = j;
    
    return result;
}
