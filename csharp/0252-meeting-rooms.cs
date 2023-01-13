public class Solution
{
    public bool CanAttendMeetings(int[][] intervals)
    {
        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
        for (int i = 1; i < intervals.Length; i++)
        {
            int prevEndTime = intervals[i - 1][1];
            int currStartTime = intervals[i][0];
            if (prevEndTime > currStartTime)
            {
                return false;
            }
        }
        return true;
    }
}