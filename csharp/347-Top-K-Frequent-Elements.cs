public class Solution
{
    public int[] TopKFrequent(int[] nums, int k)
    {
        var topK = new int[k];

        var numToCount = new Dictionary<int, int>();

        foreach (var num in nums)
        {
            if (numToCount.ContainsKey(num))
            {
                numToCount[num]++;
            }
            else
            {
                numToCount[num] = 1;
            }
        }

        PriorityQueue<int, int> priorityQueue = new(new ElementComparer());

        foreach (var kv in numToCount)
        {
            priorityQueue.Enqueue(kv.Key, kv.Value);
        }

        for (var i = 0; i < k; i++)
        {
            topK[i] = priorityQueue.Dequeue();
        }

        return topK;
    }
}

public class ElementComparer : IComparer<int>
{
    public int Compare(int x, int y)
    {
        return y - x;
    }
}
