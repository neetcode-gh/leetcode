// Interval structure
struct Interval {
    int start;
    int end;
};

// Function to compare intervals for sorting
int compareIntervals(const void* a, const void* b) {
    return ((struct Interval*)a)->start - ((struct Interval*)b)->start;
}

// Function to merge intervals
int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {
    if (intervalsSize <= 1) {
        *returnSize = intervalsSize;
        *returnColumnSizes = intervalsColSize;
        return intervals;
    }

    // Create an array of Interval structures
    struct Interval* sortedIntervals = (struct Interval*)malloc(sizeof(struct Interval) * intervalsSize);
    for (int i = 0; i < intervalsSize; i++) {
        sortedIntervals[i].start = intervals[i][0];
        sortedIntervals[i].end = intervals[i][1];
    }

    // Sort intervals based on start times
    qsort(sortedIntervals, intervalsSize, sizeof(struct Interval), compareIntervals);

    // Merge intervals
    struct Interval* mergedIntervals = (struct Interval*)malloc(sizeof(struct Interval) * intervalsSize);
    int mergedCount = 0;

    for (int i = 0; i < intervalsSize; i++) {
        if (mergedCount == 0 || mergedIntervals[mergedCount - 1].end < sortedIntervals[i].start) {
            mergedIntervals[mergedCount++] = sortedIntervals[i];
        } else {
            mergedIntervals[mergedCount - 1].end = mergedIntervals[mergedCount - 1].end > sortedIntervals[i].end
                                                      ? mergedIntervals[mergedCount - 1].end
                                                      : sortedIntervals[i].end;
        }
    }

    // Allocate memory for return arrays
    int** result = (int**)malloc(sizeof(int*) * mergedCount);
    *returnColumnSizes = (int*)malloc(sizeof(int) * mergedCount);

    for (int i = 0; i < mergedCount; i++) {
        result[i] = (int*)malloc(sizeof(int) * 2);
        result[i][0] = mergedIntervals[i].start;
        result[i][1] = mergedIntervals[i].end;
        (*returnColumnSizes)[i] = 2;
    }

    *returnSize = mergedCount;

    free(sortedIntervals);
    free(mergedIntervals);

    return result;
}
