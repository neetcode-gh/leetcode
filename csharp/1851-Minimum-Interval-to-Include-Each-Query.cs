public class Solution
{
    public int[] MinInterval(int[][] intervals, int[] queries)
    {

        var q = queries.Length;
        var indexDict = new int[q][];
        var index = 0;
        foreach (var query in queries)
        {
            indexDict[index] = new int[2] { query, index };
            index++;
        }
        Array.Sort(indexDict, (a, b) => a[0] - b[0]);
        Array.Sort(intervals, (a, b) => a[0] - b[0]);

        var pq = new PriorityQueue<int[], int>();
        var result = new int[queries.Length];

        index = 0;
        foreach (var query in indexDict)
        {
            var resultIndex = query;
            var calResult = -1;

            while (index < intervals.Length && intervals[index][0] <= resultIndex[0])
            {
                var curr = intervals[index];
                pq.Enqueue(new int[2] { curr[1] - curr[0] + 1, curr[1] }, curr[1] - curr[0] + 1);
                index++;
            }

            while (pq.Count > 0 && pq.Peek()[1] < resultIndex[0])
            {
                pq.Dequeue();
            }
            calResult = pq.Count > 0 ? pq.Peek()[0] : -1;
            result[resultIndex[1]] = calResult;
        }

        return result;

    }
}