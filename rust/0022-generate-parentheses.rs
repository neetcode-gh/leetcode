impl Solution {
    pub fn generate_parenthesis(n: i32) -> Vec<String> {
        let mut res: Vec<String> = vec![];

        fn backtrack(n: i32, res: &mut Vec<String>, mut s: String, open: i32, close: i32) {
            if s.len() == 2*n as usize {
                res.push(s);
                return;
            }
            if open < n{
                s.push('(');
                backtrack(n, res, s.clone(), open+1, close);
                s.pop();
            }
            if close < open{
                s.push(')');
                backtrack(n, res, s.clone(), open, close+1);
                s.pop();
            }
        }

        backtrack(n, &mut res, String::new(), 0, 0);
        res
    }
}
