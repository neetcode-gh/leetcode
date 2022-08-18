class Solution {
    // Time Complexity: O(N^2 log(N)) where N is the length of points. N^2 comes from the fact we need to find the distance between a currNode and every other node to pick the shortest distance. log(N) comes from Priority Queue
    // Space Complexity: O(N^2)
    public int minCostConnectPoints(int[][] points) {
        PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[0] - b[0]); // edge weight, the index of next node
        pq.offer(new int[]{0,0});
        int len = points.length;
        Set<Integer> visited = new HashSet<>();
        int cost = 0;
        
        // When visited.size() == points.len meaning that all the nodes has been connected. 
        while(visited.size() < len){
            int[] arr = pq.poll();
            
            int weight = arr[0];
            int currNode = arr[1];
            
            if(visited.contains(currNode))
                continue;
            
            visited.add(currNode);
            cost += weight;
            
            for(int nextNode = 0; nextNode < len; nextNode++){
                if(!visited.contains(nextNode)){
                   int nextWeight = Math.abs(points[nextNode][0] - points[currNode][0]) + Math.abs(points[nextNode][1] - points[currNode][1]); 
                    pq.offer(new int[]{nextWeight, nextNode});
                }
            }
        }
        
        
        return cost;
    }
}
