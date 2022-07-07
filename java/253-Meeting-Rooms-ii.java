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
        if(intervals.isEmpty()) return 0;

        Collections.sort(intervals, (a, b) -> Integer.compare(a.start, b.start));

        Queue<Interval> queue = new PriorityQueue<>((a, b) -> Integer.compare(a.end, b.end));
        
        int count = 0;
        for (Interval interval : intervals) {
            
            while(!queue.isEmpty() && interval.start >= queue.peek().end) queue.poll();

            queue.offer(interval);
            count = Math.max(count, queue.size());
        }
        return count;
    }
}

// Two pointer approach
public class Solution {
    public int minMeetingRooms(List<Interval> intervals) {
        if (intervals.size() == 0) {
            return 0;
        }

        int len = intervals.size();
        int[] startTime = new int[len];
        int[] endTime = new int[len];

        for (int i = 0; i < len; i++) {
            startTime[i] = intervals.get(i).start;
            endTime[i] = intervals.get(i).end;
        }

        Arrays.sort(startTime);
        Arrays.sort(endTime);

        int res = 0;
        int count = 0;
        int s = 0;
        int e = 0;

        while (s < len) {
            if (startTime[s] < endTime[e]) {
                s++;
                count++;
            } else {
                e++;
                count--;
            }
            res = Math.max(res, count);
        }

        return res;
    }
}
