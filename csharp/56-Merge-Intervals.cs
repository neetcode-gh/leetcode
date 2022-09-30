public class Solution
{
    public int[][] Merge(int[][] intervals)
    {

        var sortedInterval = intervals.Clone() as int[][];
        Array.Sort(sortedInterval, (a, b) => a[0] - b[0]);

        var mergedInterval = new List<int[]>();
        var lastInterval = sortedInterval[0];
        mergedInterval.Add(lastInterval);

        for (var i = 1; i < sortedInterval.Length; i++)
        {
            var current = sortedInterval[i];
            var lastIntervalEnd = lastInterval[1];
            var nextIntervalEnd = current[1];
            var nextIntervalStart = current[0];

            if (lastIntervalEnd >= nextIntervalStart)
                lastInterval[1] = Math.Max(nextIntervalEnd, lastIntervalEnd);
            else
            {
                lastInterval = current;
                mergedInterval.Add(lastInterval);
                //lastInterval = current;
            }
        }

        return mergedInterval.ToArray();
    }
}