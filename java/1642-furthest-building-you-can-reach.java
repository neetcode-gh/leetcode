/*            Max Heap Method
  ----------------------------------------*/
class Solution {
    public int furthestBuilding(int[] heights, int bricks, int ladders) {
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);
        for (int i = 0; i < heights.length - 1; i++) {
            int diff = heights[i + 1] - heights[i];
            
            if (diff <= 0)
                continue;

            bricks -= diff;
            pq.add(diff);

            if(bricks < 0){
                if(ladders == 0)
                    return i;
                ladders -= 1; 
                bricks += pq.poll();   
            }
        }
        return heights.length - 1;
    }
}

/*                Min Heap Method
  -----------------------------------------------*/
class Solution {
    public int furthestBuilding(int[] heights, int bricks, int ladders) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for(int i = 0; i < heights.length-1; i++){
            int diff = heights[i + 1] - heights[i];
            if(diff < 0)
                continue;
            pq.add(diff);
            if(pq.size() > ladders)
                bricks -= pq.poll();
            if(bricks < 0)
                return i;        
        }
        return heights.length - 1;
    }
}
