impl Solution {
    pub fn is_subsequence(s: String, t: String) -> bool {
        let s: Vec<char> = s.chars().collect();
        let t: Vec<char> = t.chars().collect();
        let mut l = 0;
        let mut r = 0;
        while l < s.len() && r < t.len() {
            if s[l] == t[r] {
                l += 1;
                r += 1;
            } else {
                r += 1;
            }
        }
        l == s.len()
    }
}
