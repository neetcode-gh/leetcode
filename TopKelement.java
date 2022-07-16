class Solution {
      public int[] topKFrequent(int[] nums, int k){
          
        //Count the number of occurrences of each number
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums)
            count.put(num, count.getOrDefault(num, 0) + 1);

        //max heap
        PriorityQueue<int[]> priorityQueue = new PriorityQueue<>((a, b) -> b[1] - a[1]);
        for (int key : count.keySet())
            priorityQueue.add(new int[]{key, count.get(key)});

        //Take the largest k elements in the heap
        int[] res = new int[k];
        for (int i = 0; i < k; i++)
            res[i] = priorityQueue.poll()[0];
          
          
        return res;
    }
}
