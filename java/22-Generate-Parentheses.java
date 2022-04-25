class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> ans = new ArrayList<>();
        backTrack(n, 0, 0, ans, new StringBuilder());
        return ans;
    }
    
    private void backTrack(final int n, 
                           int openN, 
                           int closedN, 
                           final List<String> ans, 
                           final StringBuilder sb) {
        
        if(openN == n && closedN == n) {
            ans.add(sb.toString());
        }
        
        if(openN < n) {
            sb.append("(");
            backTrack(n, openN + 1, closedN, ans, sb);
            sb.deleteCharAt(sb.length() - 1);
        }
        
        if(closedN < openN) {
            sb.append(")");
            backTrack(n, openN, closedN + 1, ans, sb);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}