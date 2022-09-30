public class Solution
{
    //Same problem as #1296. Divide Array in Sets of K Consecutive Numbers
    //T: O(logN) for min heap, N is for all the items-> so overall O(NlogN)
    public bool IsNStraightHand(int[] hand, int groupSize)
    {
        if (hand.Length % groupSize != 0)
            return false;


        var dictionary = new Dictionary<int, int>();
        var minHeap = new PriorityQueue<int, int>();
        foreach (var item in hand)
        {
            dictionary.TryAdd(item, 0);
            dictionary[item]++;
        }

        // heapify is linear algorithm
        foreach (var key in dictionary.Keys)
            minHeap.Enqueue(key, key);

        while (minHeap.Count > 0)
        {
            var first = minHeap.Peek();

            for (var i = first; i < first + groupSize; i++)
            {
                if (!dictionary.ContainsKey(i))
                    return false;

                dictionary[i]--;
                if (dictionary[i] == 0)
                    if (i != minHeap.Peek())
                        return false;
                    else
                        minHeap.Dequeue();
            }

        }

        return true;

    }
}