/*
Given an array intervals where intervals[i] = [li, ri] represent the interval
[li, ri), remove all intervals that are covered by another interval in the list.
Return the number of remaining intervals.

Time: O(nlog(n)) (where n is the number of intervals)
Space: O(1)
*/

int cmp_fun(const void *const_a, const void *const_b) {
    const int* interval_a = *(const int **)const_a;
    const int* interval_b = *(const int **)const_b;
    if (interval_a[0] == interval_b[0])
        return interval_b[1] - interval_a[1];
    else
        return interval_a[0] - interval_b[0];
}

int removeCoveredIntervals(int** intervals, int intervalsSize, int* intervalsColSize){
    // Sorting of intervals: a<=b ⇔ ( a[0]<b[0] || (a[0]==b[0] && a[1]>b[1] )
    qsort(intervals, intervalsSize, sizeof(int*), cmp_fun);

    // Treatment of intervals sorted
    int end = 0;
    int number_remaining = intervalsSize;
    for (int i=0; i<intervalsSize; i++) {
        if (intervals[i][1]<=end) {
            number_remaining--;
        } else {
            end = intervals[i][1];
        }
    }
    return number_remaining;
}
