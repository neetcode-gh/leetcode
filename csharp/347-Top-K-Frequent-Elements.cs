using System.Collections.Generic;
using System.Linq;

namespace NeetCodeCSharpSolutions.ArraysHashing
{
    public class Solution
    {
        public int[] TopKFrequent(int[] nums, int k)
        {
            var pq = new PriorityQueue<int, int>(new DescendingComparer());

            var map = nums.GroupBy(x => x).ToDictionary(x => x.Key, x => x.Count());

            foreach (var kv in map)
            {
                pq.Enqueue(kv.Key, kv.Value);
            }

            var ans = new List<int>();
            while (k-- > 0)
            {
                ans.Add(pq.Dequeue());
            }

            return ans.ToArray();
        }

        public class DescendingComparer : IComparer<int>
        {
            public int Compare(int x, int y)
            {
                return y.CompareTo(x);
            }
        }
    }
}
