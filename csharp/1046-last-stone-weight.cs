public class Solution
{
    private PriorityQueue<int, int> pq;

    // T: O(NLogN)
    public int LastStoneWeight(int[] stones)
    {
        pq = new PriorityQueue<int, int>(new MaxHeapComparer());

        AddStones(stones);
        ComputeLastStoneWeight();

        return pq.Count == 0 ? 0 : pq.Dequeue();
    }


    private void AddStones(int[] stones)
    {
        foreach (var stone in stones)
        {
            // T: Heapify is O(N) for every enqueued item
            pq.Enqueue(stone, stone);
        }
    }

    // T: O(NLogN), to get max value its O(LogN) and we perform this for N items => O(NLogN)
    private void ComputeLastStoneWeight()
    {
        while (pq.Count > 1)
        {
            var y = pq.Dequeue();
            var x = pq.Dequeue();

            if (x != y)
            {
                var diff = y - x;
                pq.Enqueue(diff, diff);
            }
        }
    }

    public class MaxHeapComparer : IComparer<int>
    {
        public int Compare(int x, int y)
        {
            return y - x;
        }
    }
}