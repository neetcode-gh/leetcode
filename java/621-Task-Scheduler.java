class Solution {

    public int leastInterval(char[] tasks, int n) {
        if (n == 0) return tasks.length;
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);
        Queue<Pair<Integer, Integer>> q = new LinkedList<>();
        int[] arr = new int[26];
        for (char c : tasks) arr[c - 'A']++;
        for (int val : arr) if (val > 0) pq.add(val);
        int time = 0;

        while ((!pq.isEmpty() || !q.isEmpty())) {
            time++;
            if(!pq.isEmpty()){
                  int val = pq.poll();
                  val--;
                  if (val > 0) 
                      q.add(new Pair(val, time + n));    
            }
            
            if(!q.isEmpty() && q.peek().getValue() == time)
                pq.add(q.poll().getKey());
        }
        return time;
    }
}
