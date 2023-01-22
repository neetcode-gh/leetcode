public class Solution {
    public int MinMeetingRooms(int[][] intervals) {
          if (intervals == null || intervals.Length == 0)
                return 0;

            int result = 0;
            int[] start = new int[intervals.Length], end = new int[intervals.Length];

            for (int i = 0; i < intervals.Length; i++)
            {
                start[i] = intervals[i][0];
                end[i] = intervals[i][1];
            }

            Array.Sort(start);
            Array.Sort(end);

            for (int s = 0, e = 0; s < start.Length; s++)
                if (start[s] < end[e])
                    result++;
                else
                    e++;

            return result;
    }
}
