/**
 * https://leetcode.com/problems/non-overlapping-intervals/
 * Time O(N * logN) | Space O(1)
 * @param {number[][]} intervals
 * @return {number}
 */
 var eraseOverlapIntervals = function(intervals) {
    intervals.sort(([ aStart, aEnd ], [ bStart, bEnd ]) => aEnd !== bEnd
        ? aEnd - bEnd
        : aStart - bStart
    );

    return getGaps(intervals)
};

const getGaps = (intervals, gaps = 1) => {
    const prev = intervals.shift();

    for (const curr of intervals) {
        const [ prevStart, prevEnd ] = prev;
        const [ currStart, currEnd ] = curr;

        const hasGap = prevEnd <= currStart;
        if (!hasGap) continue;

        prev[1] = curr[1];
        gaps++;
    }

    return (intervals.length + 1) - gaps;
}