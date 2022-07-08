/*
    Given array of non-overlapping intervals & a new interval, insert & merge if necessary
    Ex. intervals = [[1,3],[6,9]], newInterval = [2,5] -> [[1,5],[6,9]]

    To merge: while intervals are still overlapping the new one, take the larger bounds

    Time: O(n)
    Space: O(n)
*/

class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        
        List<int[]> result = new LinkedList<>();
        int i = 0;
        int n = intervals.length;
        
        //prev to new interval
        while(i<n && intervals[i][1]<newInterval[0]){
            result.add( intervals[i]);
            i++;
        }
        
        // merge case
          while(i<n && intervals[i][0]<=newInterval[1]){
            newInterval[0] = Math.min(newInterval[0],intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1],intervals[i][1]);
            i++;
        }
        
         result.add(newInterval);
      
        //post merging new 
        while(i<n){
             result.add( intervals[i]);
            i++; 
        }

        return result.toArray(new int[result.size()][]);
    }
}


