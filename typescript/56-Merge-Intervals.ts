function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);

  let output = [intervals[0]];
  for (const [start, end] of intervals.slice(1)) {
    let lastEnd = output[output.length - 1][1];

    if (start <= lastEnd) {
      output[output.length - 1][1] = Math.max(lastEnd, end);
    } else {
      output.push([start, end]);
    }
  }

  return output;
}
