public class Solution {
    public IList<string> GenerateParenthesis(int n) {
        var result = new List<string>();
        var seq = new StringBuilder();
        
        void backtrack(int open, int close) {
            if(seq.Length == n * 2) {
                result.Add(seq.ToString());
                return;
            } 
            
            if(open < n) {
                seq.Append("(");
                backtrack(open + 1, close);
                seq.Remove(seq.Length - 1, 1);
            }
            if(close < open) {
                seq.Append(")");
                backtrack(open, close + 1);
                seq.Remove(seq.Length - 1, 1);
            }
            
        }

        backtrack(0, 0);

        return result;
    }
}