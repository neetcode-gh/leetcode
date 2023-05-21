class Solution {
    public int[] assignTasks(int[] servers, int[] tasks) {
        int[] res = new int[tasks.length];

        // [weight, index]
        Queue<int[]> available = new PriorityQueue<>((a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);
        for (int i = 0; i < servers.length; i++)
            available.add(new int[] { servers[i], i });

        int time = 0;
        int nextTask = 0;
        // [weight, index, done time]
        Queue<int[]> unavail = new PriorityQueue<>((a, b) -> a[2] - b[2]);
        while (nextTask < tasks.length) {
            // release available servers
            while (!unavail.isEmpty() && unavail.peek()[2] <= time) {
                int[] curr = unavail.poll();
                available.add(new int[] { curr[0], curr[1] });
            }

            // assign task(s)
            while (!available.isEmpty() && nextTask < time && nextTask != tasks.length) {
                int[] curr = available.poll();
                unavail.add(new int[] { curr[0], curr[1], time + tasks[nextTask] });
                res[nextTask++] = curr[1];
            }

            // advance time
            if (available.isEmpty())
                time = unavail.peek()[2];
            else
                time++;
        }
        return res;
    }
}