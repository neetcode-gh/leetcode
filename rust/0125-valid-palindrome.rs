impl Solution {
    pub fn is_palindrome(s: String) -> bool {
        let s: Vec<char> = s.chars()
            .filter(|c| c.is_alphanumeric())
            .map(|c| c.to_lowercase().next().unwrap())
            .collect();
        
        let len = s.len();
        
        for i in 0..(len/2){
            if s[i] != s[len - i - 1]{
                return false
            }
        }

        true
    }
}