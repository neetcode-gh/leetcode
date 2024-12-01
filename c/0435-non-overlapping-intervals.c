// Interval structure
struct Interval {
    int start;
    int end;
};

// Function to compare intervals for sorting
int compareIntervals(const void* a, const void* b) {
    return ((struct Interval*)a)->end - ((struct Interval*)b)->end;
}

int eraseOverlapIntervals(int** intervals, int intervalsSize, int* intervalsColSize) {
    if (intervalsSize <= 1) {
        return 0;
    }

    // Create an array of Interval structures
    struct Interval* sortedIntervals = (struct Interval*)malloc(sizeof(struct Interval) * intervalsSize);
    for (int i = 0; i < intervalsSize; i++) {
        sortedIntervals[i].start = intervals[i][0];
        sortedIntervals[i].end = intervals[i][1];
    }

    // Sort intervals based on end times
    qsort(sortedIntervals, intervalsSize, sizeof(struct Interval), compareIntervals);

    int end = sortedIntervals[0].end;
    int nonOverlapCount = 1;

    for (int i = 1; i < intervalsSize; i++) {
        if (sortedIntervals[i].start >= end) {
            end = sortedIntervals[i].end;
            nonOverlapCount++;
        }
    }

    free(sortedIntervals);

    // Return the count of overlapping intervals to be removed
    return intervalsSize - nonOverlapCount;
}
