function eraseOverlapIntervals(intervals: number[][]): number {
  intervals.sort((a, b) => a[0] - b[0]);

  let res = 0;
  let prevEnd = intervals[0][1];

  for (const [start, end] of intervals.slice(1)) {
    if (start >= prevEnd) {
      prevEnd = end;
    } else {
      res += 1;
      prevEnd = Math.min(prevEnd, end);
    }
  }

  return res;
}
