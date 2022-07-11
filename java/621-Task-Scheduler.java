class Solution {
    public int leastInterval(char[] tasks, int n) {
        if (n==0) return tasks.length;
        PriorityQueue<Integer> pq = new PriorityQueue<>((a,b)->b-a);
        Queue<Pair<Integer, Integer>> q = new LinkedList<>();
        int[] arr = new int[26];
        for (char c: tasks) 
            arr[c-'A']++;
        for (int val: arr) 
            if (val>0) 
                pq.add(val);
        int time = 0;
        // System.out.println(pq);
        // System.out.println(q);
        while ((!pq.isEmpty() || !q.isEmpty())) {
            if (pq.isEmpty()) {
                time = Math.max(q.peek().getValue(), time);
                pq.add(q.poll().getKey());
            }
            int val = pq.poll();
            val--;
            time++;
            if (val>0) q.add(new Pair(val, time+n));
//             System.out.println(q + " "+ time);
        }
        return time;
    }
}
