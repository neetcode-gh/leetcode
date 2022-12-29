class Solution {
    public int[] getOrder(int[][] tasks) {
        
        // Sort based on min task processing time or min task index.
        PriorityQueue<int[]> nextTask = new PriorityQueue<int[]>((a, b) -> (a[1] != b[1] ? (a[1] - b[1]) : (a[2] - b[2])));
        
        // Store task enqueue time, processing time, index.
        int sortedTasks[][] = new int[tasks.length][3];
        for (int i = 0; i < tasks.length; ++i) {
            sortedTasks[i][0] = tasks[i][0];
            sortedTasks[i][1] = tasks[i][1];
            sortedTasks[i][2] = i;
        }
        
        // Sort the tasks based on enqueueTime
        Arrays.sort(sortedTasks, (a, b) -> Integer.compare(a[0], b[0]));
        int tasksProcessingOrder[] = new int[tasks.length];
        
        long currTime = 0;
        int taskIndex = 0;
        int ansIndex = 0;
        
        // Stop when no tasks are left in array and heap.
        while (taskIndex < tasks.length || !nextTask.isEmpty()) {
            if (nextTask.isEmpty() && currTime < sortedTasks[taskIndex][0]) {
                // When the heap is empty, try updating currTime to next task's enqueue time. 
                currTime = sortedTasks[taskIndex][0];
            }
            
            // Push all the tasks whose enqueueTime <= currtTime into the heap.
            while (taskIndex < tasks.length && currTime >= sortedTasks[taskIndex][0]) { 
                nextTask.add(sortedTasks[taskIndex]);
                ++taskIndex;
            }
            
            int[] temp = nextTask.poll();
            
            // Complete this task and increment currTime.
            currTime += temp[1]; 
            tasksProcessingOrder[ansIndex++] = temp[2];
        }
        
        return tasksProcessingOrder;
    }
}
