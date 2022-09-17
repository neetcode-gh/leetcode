function insert(intervals: number[][], newInterval: number[]): number[][] {
    const { beforeIndex, before } = getBefore(intervals, newInterval);
    const afterIndex = mergeIntervals(intervals, newInterval, beforeIndex);
    const after = intervals.slice(afterIndex);

    return [...before, newInterval, ...after]; 
};

const getBefore = (intervals, newInterval, index = 0, before = []) => {
    const hasGap = ([prevStart, prevEnd], [currStart, currEnd]) => prevEnd < currStart;
    
    while (index < intervals.length && hasGap(intervals[index], newInterval)) {
        const current = intervals[index];
        before.push(current);
        index++;
    }
    return { beforeIndex: index, before };
};

const mergeIntervals = (intervals, newInterval, index) => {
    const hasOverlap = ([prevStart, prevEnd], [currStart, currEnd]) => currStart <= prevEnd;

    while (index < intervals.length && hasOverlap(newInterval, intervals[index])) {
        const current = intervals[index];
        newInterval[0] = Math.min(newInterval[0], current[0]);
        newInterval[1] = Math.max(newInterval[1], current[1]);
        index++;
    }
    return index;
};