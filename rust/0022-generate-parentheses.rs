impl Solution {
    pub fn generate_parenthesis(n: i32) -> Vec<String> {
        // Using the function stack instead of an explicitly allocated Vec
        let mut res: Vec<String> = vec![];

        fn backtrack(res: &mut Vec<String>, s: String, open: i32, close: i32) {
            if open == 0 && close == 0 {
                res.push(s);
                return;
            }
            if open == close {
                backtrack(res, s.clone() + "(", open - 1, close);
            } else {
                if open > 0 {
                    backtrack(res, s.clone() + "(", open - 1, close);
                }
                if close > 0 {
                    backtrack(res, s.clone() + ")", open, close - 1);
                }
            }
        }

        backtrack(&mut res, String::from(""), n, n);
        res
    }
}
