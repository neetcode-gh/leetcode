public class Solution {
    // Closest to origin minHeap
    private PriorityQueue<int[], double> pq;
    private int size;
    // T: O(Max(M, KLogM)), S: O(k)
    public int[][] KClosest(int[][] points, int k) {
        pq = new PriorityQueue<int[], double>();
        size = k;
        
        AddToPriorityQueue(points);
        
        return Closest();
    }
    
    public class MaxHeap : IComparer<double>{
        public int Compare(double x, double y){
            if( x< y) return 1;å
            else if (x > y) return -1;
            else return 0;
        }
    }
    
    // T: O(M)
    private void AddToPriorityQueue(int[][] points){
        foreach(var point in points){
            //var value = (double) Math.Sqrt(point[0]*point[0] + point[1]*point[1]);
            var value = (double) point[0]*point[0] + point[1]*point[1];
            pq.Enqueue(point, value);
        
           
        }
    }
    
    // T: O(KLogM)
    private int[][] Closest(){
        var result = new List<int[]>();
        while(size > 0){
            result.Add(pq.Dequeue());
            size--;
        }
        
        return result.ToArray();
    }
}
