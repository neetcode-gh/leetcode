function merge(intervals: number[][]): number[][] {
    intervals.sort(([aStart, aEnd], [bStart, bEnd]) => aStart !== bStart ? aStart - bStart : aEnd - bEnd);
    
    return mergeInterval(intervals);
};

function mergeInterval(intervals: number[][]): number[][] {
    let merged = [];
    let prev = intervals.shift();
    
    for (const curr of intervals) {
        const [prevStart, prevEnd] = prev;
        const [currStart, currEnd] = curr;
        
        // Overlap occurs
        if (currStart <= prevEnd) {
            prev[1] = Math.max(prev[1], curr[1]);
            continue;
        }
        
        merged.push(prev);
        prev = curr;
    }
    return [...merged, prev];
}