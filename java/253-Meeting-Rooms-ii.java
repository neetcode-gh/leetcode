/**
 * Definition of Interval:
 * public class Interval {
 *     int start, end;
 *     Interval(int start, int end) {
 *         this.start = start;
 *         this.end = end;
 *     }
 * }
 */

public class Solution {

  /**
   * @param intervals: an array of meeting time intervals
   * @return: the minimum number of conference rooms required
   */
  public int minMeetingRooms(List<Interval> intervals) {
    if (intervals.isEmpty()) return 0;

    Collections.sort(intervals, (a, b) -> Integer.compare(a.start, b.start));

    Queue<Interval> queue = new PriorityQueue<>((a, b) ->
      Integer.compare(a.end, b.end)
    );

    int count = 0;
    for (Interval interval : intervals) {
      while (
        !queue.isEmpty() && interval.start >= queue.peek().end
      ) queue.poll();

      queue.offer(interval);
      count = Math.max(count, queue.size());
    }
    return count;
  }
}
