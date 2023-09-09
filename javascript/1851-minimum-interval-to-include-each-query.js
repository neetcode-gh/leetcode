/**
 * @param {number[][]} intervals
 * @param {number[]} queries
 * @return {number[]}
 */
var minInterval = function(intervals, queries) {
  intervals.sort((a, b) => a[0] - b[0]);
  const queriesSorted = [ ...queries ].sort((a, b) => a - b);
  const minHeap = new MinPriorityQueue();
  const output = {};
  let i = 0;

  for (const query of queriesSorted) {
    while (i < intervals.length && intervals[i][0] <= query) {
      const [ start, end ] = intervals[i];
      const length = end - start + 1;
      // Use length as the priority in the heap.
      minHeap.enqueue([ length, end ], length);
      i++;
    }

    while (!minHeap.isEmpty() && minHeap.front().element[1] < query) {
      minHeap.dequeue();
    }

    output[query] = (!minHeap.isEmpty()) ? minHeap.front().element[0] : -1;
  }

  return queries.map((query) => output[query]);
};
