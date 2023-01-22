impl Solution {
    pub fn valid_palindrome(s: String) -> bool {
        fn is_palindrome(s: &[u8]) -> Option<(usize, usize)> {
            let (mut i, mut j) = (0, s.len() - 1);
            while i < j {
                if s[i] != s[j] {
                    return Some((i, j));
                }
                i += 1;
                j -= 1;
            }

            None // is palindrome
        }

        let s = s.as_bytes().to_vec();
        match is_palindrome(&s) {
            Some((i, j)) => {
                if is_palindrome(&s[i+1..=j]).is_none() {
                    return true;
                }
                if is_palindrome(&s[i..=j-1]).is_none() {
                    return true;
                }
            }
            None => {
                return true;
            }
        }

        false       
    }
}
