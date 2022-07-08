class Solution {
    public int[][] merge(int[][] intervals) {
                
        Arrays.sort(intervals,(a,b)->a[0]-b[0]);
        LinkedList<int[]> merged = new LinkedList<>();
        
        for(int[] interval :intervals){
               
            if(merged.isEmpty() || merged.getLast()[1]<interval[0])
                 merged.add(interval);
            else{
                merged.getLast()[1]= Math.max( merged.getLast()[1],interval[1]);
            }
        }
        
        return merged.toArray(new int[merged.size()][]);

    }
    
}

