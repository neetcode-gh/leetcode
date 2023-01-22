impl Solution {
    pub fn length_of_last_word(s: String) -> i32 {
        let s = s.trim_end();
        let s: Vec<char> = s.chars().collect();
        let mut ans = 0;
        for i in (0..s.len()).rev() {
            if !s[i].is_whitespace() {
                ans += 1;
            } else {
                break;
            }
        }
        ans
    }
}
