// Dynammic Programming - Memoization
// Time Complexity O(s * t) | Space Complexity O(s * t)
class Solution {
    public int numDistinct(String s, String t) {
        
        int n = s.length() + 1;
        int m = t.length() + 1;
        int[][] memo = new int[n][m];
        
        for (int[] row : memo){
				Arrays.fill(row, -1);
        }
        
        return recursion(s, t, 0, 0, memo);
        
    }
    
    
    public int recursion(String s, String t, int sIdx, int tIdx, int[][] memo){
        
        if (memo[sIdx][tIdx] != -1){
            return memo[sIdx][tIdx];
        }
            
        if (tIdx >= t.length()){
            return 1;
        }
        
        if (sIdx >= s.length()){
            return 0;
        }
        
        if (t.charAt(tIdx) == s.charAt(sIdx)){
            memo[sIdx][tIdx] = recursion(s, t, sIdx + 1, tIdx + 1, memo) + recursion(s, t, sIdx + 1, tIdx, memo);
            return memo[sIdx][tIdx];   
        }
        
        memo[sIdx][tIdx] = recursion(s, t, sIdx + 1, tIdx, memo);
        return memo[sIdx][tIdx];
        
    }
    
}