class Solution {
    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        // Max-heap for profits of affordable projects
        Queue<Integer> maxProfit = new PriorityQueue<>(Comparator.reverseOrder());
        
        // Min-heap for (capital, profit) pairs
        Queue<int[]> minCapital = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        
        for (int i = 0; i < capital.length; i++) {
            minCapital.add(new int[] { capital[i], profits[i] });
        }
        
        for (int i = 0; i < k; i++) {
            // Add all affordable projects to the maxProfit heap
            while (!minCapital.isEmpty() && minCapital.peek()[0] <= w) {
                int[] project = minCapital.poll();
                maxProfit.add(project[1]);
            }
            
            // If there are no affordable projects, break
            if (maxProfit.isEmpty()) {
                break;
            }
            
            // Select the project with the maximum profit
            w += maxProfit.poll();
        }
        
        return w;
    }
}
