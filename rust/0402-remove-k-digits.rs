impl Solution {
    pub fn remove_kdigits(num: String, k: i32) -> String {
        let mut stack = vec![];
        let mut k = k as usize;

        for ch in num.chars() {
            while let Some(&top) = stack.last() {
                if k > 0 && top > ch {
                    k -= 1;
                    stack.pop();
                } else {
                    break;
                }
            }

            stack.push(ch);
        }

        // stack = stack[..stack.len() - k].to_vec();
        while k != 0 {
            stack.pop();
            k -= 1;
        }

        let res: String = stack.into_iter().skip_while(|&ch| ch == '0').collect();
        if res.is_empty() {
            "0".to_string()
        } else {
            res
        }
    }
}