impl Solution {
    pub fn generate_parenthesis(n: i32) -> Vec<String> {
        /*
            Only add open parenthesis if open < n
            Only add closing parenthesis if close < open
            valid if open == close == n
        */
        let mut stack: Vec<u8> = vec![];
        let mut res: Vec<String> = vec![];

        fn backtrack(
            stack: &mut Vec<u8>,
            res: &mut Vec<String>,
            open_n: i32,
            closed_n: i32,
            n: i32,
        ) {
            if open_n == closed_n && closed_n == n {
                res.push(String::from_utf8(stack.clone()).unwrap());
                return;
            }

            if open_n < n {
                stack.push(b'(');
                backtrack(stack, res, open_n + 1, closed_n, n);
                stack.pop();
            }

            if closed_n < open_n {
                stack.push(b')');
                backtrack(stack, res, open_n, closed_n + 1, n);
                stack.pop();
            }
        }
        backtrack(&mut stack, &mut res, 0, 0, n);
        res
    }
}