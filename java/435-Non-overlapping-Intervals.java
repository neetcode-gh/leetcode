//Same approach as Neetcode's video.

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a,b)->a[0]-b[0]);
        int end = intervals[0][1], ans = 0;
        for (int i=1; i<intervals.length; i++) {
            if (intervals[i][0]<end) {
                ans++;
                end = Math.min(end, intervals[i][1]);
            }
            else 
                end = intervals[i][1];
        }
        return ans;
    }
}
