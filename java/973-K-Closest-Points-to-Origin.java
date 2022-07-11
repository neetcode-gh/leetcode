//Both solutions use same Idea
//Time complexity O(Nlogk)

class Solution {
    public int[][] kClosest(int[][] points, int k) {
        HashMap<int[], Double> map = new HashMap<>();
        PriorityQueue<Map.Entry<int[], Double>> pq = new PriorityQueue<>((a,b)->Double.compare(a.getValue(),b.getValue()));
        for (int i = 0; i<points.length; i++) {
            map.put(points[i], Math.pow((Math.pow(points[i][0], 2)+Math.pow(points[i][1], 2)), 0.5));//We can also ignore this rooting as I did in the next solution
        }
        for (Map.Entry set: map.entrySet()) {
            pq.add(set);
        }
        int[][] ans = new int[k][2];
        for (int i = 0; i<k; i++) {
            int[] temp = pq.poll().getKey();
            ans[i][0] = temp[0];
            ans[i][1] = temp[1];
        }
        return ans;
    }
}

//Since, we need to find the minimum, it doens't matter if we square root them. As the minimum will remain the same after square rooting also.
//Ex: 4.8<4.9 -> root(4.8)<root(4.9)

class Solution {
    public int[][] kClosest(int[][] points, int k) {
        HashMap<int[], Integer> map = new HashMap<>();
        PriorityQueue<Map.Entry<int[], Integer>> pq = new PriorityQueue<>((a,b)->a.getValue()-b.getValue());
        for (int i = 0; i<points.length; i++) {
            map.put(points[i], (int)(Math.pow(points[i][0], 2)+Math.pow(points[i][1], 2)));
        }
        for (Map.Entry set: map.entrySet()) {
            pq.add(set);
        }
        int[][] ans = new int[k][2];
        for (int i = 0; i<k; i++) {
            int[] temp = pq.poll().getKey();
            ans[i][0] = temp[0];
            ans[i][1] = temp[1];
        }
        return ans;
    }
}
