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
    int MOD = (int) 1e9 + 7; 

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
    int MOD = (int) 1e9 + 7; 

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
        if (c == 'a') {
            res = dfs('e', n, l + 1);
        } else if (c == 'e') {
            res = (res + dfs('a', n, l + 1)) % MOD;
            res = (res + dfs('i', n, l + 1)) % MOD;
        } else if (c == 'i') {
            res = (res + dfs('a', n, l + 1)) % MOD;
            res = (res + dfs('e', n, l + 1)) % MOD;
            res = (res + dfs('o', n, l + 1)) % MOD;
            res = (res + dfs('u', n, l + 1)) % MOD;
        } else if (c == 'o') {
            res = (res + dfs('i', n, l + 1)) % MOD;
            res = (res + dfs('u', n, l + 1)) % MOD;
        } else {
            res = dfs('a', n, l + 1);
        }

        memo.put(key, (int)(res % MOD));
        return (int)(res % MOD);    
    }
}
