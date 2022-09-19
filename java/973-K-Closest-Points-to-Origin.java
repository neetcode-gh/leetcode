//First solution Time Complexity is O(NlogN)
//Just take a min heap and add the values using the formula and return the top k values
//We can completely ignore the square root as we are just comparing the values (if a*a>b*b => a>b)

class Solution {

    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> q = new PriorityQueue<>((a, b) ->
            Integer.compare(
                (a[0] * a[0] + a[1] * a[1]),
                (b[0] * b[0] + b[1] * b[1])
            )
        );
        for (int[] point : points) {
            q.add(point);
        }
        int[][] ans = new int[k][2];
        for (int i = 0; i < k; i++) {
            int[] cur = q.poll();
            ans[i][0] = cur[0];
            ans[i][1] = cur[1];
        }
        return ans;
    }
}

//This approach is a sightly optimized approach here we can use a max heap and maintain its size as k.
//So when we do the removal the time complexity will reduce from logn to logk
//Max heap because we will remove the top elements (the one which are greater)
//Overall Time complexity O(NlogK)

class Solution {

    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> q = new PriorityQueue<>((a, b) ->
            Integer.compare(
                (b[0] * b[0] + b[1] * b[1]),
                (a[0] * a[0] + a[1] * a[1])
            )
        ); //only this is changed (swapped)
        for (int[] point : points) {
            q.add(point);
            //remove when size increase k
            if (q.size() > k) {
                q.remove();
            }
        }
        int[][] ans = new int[k][2];
        for (int i = 0; i < k; i++) {
            int[] cur = q.poll();
            ans[i][0] = cur[0];
            ans[i][1] = cur[1];
        }
        return ans;
    }
}
//There are also some O(N) solutions using quick select and binary search https://leetcode.com/problems/k-closest-points-to-origin/solution/
