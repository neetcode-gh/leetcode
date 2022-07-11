let eraseOverlapIntervals = function (intervals) {
  intervals = intervals.sort((a, b) => a[0] - b[1]);

  let currentEnd = intervals[0][1];
  let res = 0;

  for (let i = 1; i < intervals.length; i++) {
    if (currentEnd > intervals[i][0]) {
      res += 1;
      currentEnd = Math.min(intervals[i][1], currentEnd);
    } else {
      currentEnd = intervals[i][1];
    }
  }

  return res;
};
