class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList();
        if (n == 0) return result;
        dfs(result, "", n, n);
        return result;
    }
    
    private void dfs(List<String> result, String curr, int open, int close) {
        if (open == 0 && close == 0) {
            result.add(curr);
            return;
        }
        
        if (open > 0) {
            curr+="(";
            dfs(result, curr, open-1, close);
            curr=curr.substring(0, curr.length()-1);
        }
        if (open < close) {
            curr+=")";
            dfs(result, curr, open, close-1);
            curr=curr.substring(0, curr.length()-1);
        }
    }
}
