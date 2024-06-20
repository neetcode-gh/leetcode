class Solution {
    // 0: 'a', 1: 'e', 2: 'i', 3: 'o', 4: 'u'

    private static int MOD = 1_000_000_000 + 7;
    
    private int getSum(long[] arr) {
        long sum = 0;
        for(long x: arr) {
            sum = sum + x;
            sum = sum % MOD;
        }
        return (int) sum;
    }
    
    private long[] getBaseCounts() {
        return new long[]{1, 1, 1, 1, 1};
    }
    
    private Map<Integer, List<Integer>> getNextCountMapping() {
        Map<Integer, List<Integer>> map = new HashMap<>();
        
        /*  0   1   2   3   4
            a   e   i   o   u
            
            Reverse mapping i.e. "depends on"
            {a: [e, i, u]}, {e: [a, i]}, {i: [e, o]}, 
            {o: [i]}, {u: [i, o]}
        */
        
        map.put(0, new ArrayList<>(List.of(1, 2, 4)));
        map.put(1, new ArrayList<>(List.of(0, 2)));
        map.put(2, new ArrayList<>(List.of(1, 3)));
        map.put(3, new ArrayList<>(List.of(2)));
        map.put(4, new ArrayList<>(List.of(2, 3)));
            
        return map;
    }
        
    private long[] getNextCounts(
        long[] currentCounts,
        Map<Integer, List<Integer>> mapNextCounting
    ) {
        long[] nextCounts = new long[5];
        Arrays.fill(nextCounts, 0);
        
        // Mapping conversion
        for(int key: mapNextCounting.keySet()) {
            for(int val: mapNextCounting.get(key)) {
                nextCounts[val] += (long) currentCounts[key];
                nextCounts[val] %= MOD;
            }
        }
        
        return nextCounts;
    }
    
    public int countVowelPermutation(int n) {
        long[] counts = getBaseCounts();
        if(n == 1) {
            return getSum(counts);
        }
        
        Map<Integer, List<Integer>> mapNextCounting;
        mapNextCounting = getNextCountMapping();
    
        for(int i=1; i<n; i++) {
            counts = getNextCounts(counts, mapNextCounting);
        }
        
        return getSum(counts);
    }
}
/*          Bottom-Up Approach
-----------------------------------------
    Time Complexity : O(n)
    Space Complexity : O(n)
----------------------------------------*/

class Solution {
    int MOD = (int) 1e9+7; 

    public int countVowelPermutation(int n) {
        if (n == 1) {
            return 5;
        }

        long[][] dp = new long[n + 1][5];
        for (int j = 0; j < 5; j++) {
            dp[1][j] = 1;
        }

        for (int i = 2; i <= n; i++) {
            dp[i][0] = dp[i - 1][1];                            
            dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % MOD;  
            dp[i][2] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][3] + dp[i - 1][4]) % MOD; 
            dp[i][3] = (dp[i - 1][2] + dp[i - 1][4]) % MOD;    
            dp[i][4] = dp[i - 1][0];                           
        }

        long result = 0;
        for (int j = 0; j < 5; j++) {
            result = (result + dp[n][j]) % MOD;
        }

        return (int)result;
    }
}

/*          Top Down Approach
-----------------------------------------
    Time Complexity : O(n)
    Space Complexity : O(n)
----------------------------------------*/

class Solution {
    HashMap<String, Integer> memo = new HashMap<>();
    int MOD = (int) 1e9+7; 

    public int countVowelPermutation(int n) {
        long ans = 0;
        ans = (ans + dfs('a', n, 1)) % MOD;
        ans = (ans + dfs('e', n, 1)) % MOD;
        ans = (ans + dfs('i', n, 1)) % MOD;
        ans = (ans + dfs('o', n, 1)) % MOD;
        ans = (ans + dfs('u', n, 1)) % MOD;
        return (int)ans;
    }

    private int dfs(char c, int n, int l){
        if(l == n)
            return 1;
        
        String key = c + "_" + l;
        if (memo.containsKey(key)) return memo.get(key);

        long res = 0;
        if(c == 'a') {
            res = dfs('e', n, l+1);
        } else if(c == 'e') {
            res = (res + dfs('a', n, l+1)) % MOD;
            res = (res + dfs('i', n, l+1)) % MOD;
        } else if(c == 'i') {
            res = (res + dfs('a', n, l+1)) % MOD;
            res = (res + dfs('e', n, l+1)) % MOD;
            res = (res + dfs('o', n, l+1)) % MOD;
            res = (res + dfs('u', n, l+1)) % MOD;
        } else if(c == 'o') {
            res = (res + dfs('i', n, l+1)) % MOD;
            res = (res + dfs('u', n, l+1)) % MOD;
        } else {
            res = dfs('a', n, l+1);
        }

        memo.put(key, (int)(res % MOD));
        return (int)(res % MOD);    
    }
}
