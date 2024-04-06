class Solution {
    public int numSquares(int n) {
        int[] dp = new int[n+1];
        Arrays.fill(dp, n);
        dp[0] = 0;

        for(int target = 0; target < n + 1; target++){
            for(int s = 0; s < target; s++){
                int square = s*s;
                if(target - square < 0)
                    break;
                dp[target] = Math.min(dp[target], 1 + dp[target - square]);    
            }
        }
        return dp[n];
    }
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//This is a BFS based approach.
//We can also do this problem similar to coin change but the Time and space complexity will remain same (Just an extra queue in this one stil linear space).

class Solution {

    public int numSquares(int n) {
        Queue<Integer> q = new LinkedList<>();
        //add visited array so we don't go to values which we have traversed already (similar to dp) otherwise this will give tle
        HashSet<Integer> visited = new HashSet<>();
        int ans = 0;
        q.offer(n);
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int cur = q.poll();
                if (cur == 0) return ans;
                for (int j = 1; j <= cur / j; j++) {
                    if (!visited.contains(cur - j * j)) {
                        q.offer(cur - j * j);
                        visited.add(cur - j * j);
                    }
                }
            }
            ans++;
        }
        return -1;
    }
}
