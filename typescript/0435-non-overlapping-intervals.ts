function eraseOverlapIntervals(intervals: number[][]): number {
    intervals.sort(([aStart, aEnd], [bStart, bEnd]) => aEnd !== bEnd ? aEnd - bEnd : aStart - bStart);
    
    return getGaps(intervals);
};

function getGaps(intervals: number[][]): number {
    let gaps = 0;
    const prev = intervals.shift();
    
    for (const curr of intervals) {
        const [prevStart, prevEnd] = prev;
        const [currStart, currEnd] = curr;
        
        const hasGap = prevEnd <= currStart;
        if (!hasGap) {
            continue;
        }
        
        prev[1] = curr[1];
        gaps++;
    }
    return intervals.length - gaps;
}