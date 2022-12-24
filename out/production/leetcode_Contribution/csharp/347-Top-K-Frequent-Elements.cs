public class Solution {
    public int[] TopKFrequent(int[] nums, int k) {
        int[] arr = new int[k];
        var dict = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++)
        {
            if (dict.ContainsKey(nums[i]))
            {
                dict[nums[i]]++;
            }
            else
            {
                dict.Add(nums[i], 1);    
            }
        }
        
        var pq = new PriorityQueue<int, int>();
        foreach (var key in dict.Keys)
        {
            pq.Enqueue(key, dict[key]);
            if (pq.Count > k) pq.Dequeue();
        }
        int i2 = k;
        while (pq.Count > 0) {
            arr[--i2] = pq.Dequeue();
        }
        return arr;
    }
}