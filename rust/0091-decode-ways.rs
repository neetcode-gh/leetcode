impl Solution {
    pub fn num_decodings_top_down(s: &str, index: usize, memo: &mut Vec<Option<i32>>) -> i32 {
        if index == s.len() {
            return 1;
        }

        if s.chars().nth(index).unwrap() == '0' {
            return 0;
        }

        if let Some(result) = memo[index] {
            return result;
        }

        let mut ways = Solution::num_decodings_top_down(s, index + 1, memo);

        if index + 1 < s.len() && (s.chars().nth(index).unwrap() == '1' || 
                                   (s.chars().nth(index).unwrap() == '2' && 
                                    s.chars().nth(index + 1).unwrap() <= '6')) {
            ways += Solution::num_decodings_top_down(s, index + 2, memo);
        }

        memo[index] = Some(ways);
        ways
    }

    pub fn num_decodings(s: String) -> i32 {
        let mut memo = vec![None; s.len()];
        Solution::num_decodings_top_down(&s, 0, &mut memo)
    }
}
