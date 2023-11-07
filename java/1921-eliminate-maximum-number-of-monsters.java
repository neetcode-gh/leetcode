class Solution {
    public int eliminateMaximum(int[] dist, int[] speed) {
        int n = dist.length;
        double[] arrivalTime = new double[n];
        for(int i = 0; i < n; i++){
            arrivalTime[i] = (double) dist[i] / speed[i];
        }
        Arrays.sort(arrivalTime);
        int res = 0;

        for(int i = 0; i < n; i++){
            if(arrivalTime[i] <= i)
                break;
            res++;    
        }
        return res;
    }
}
