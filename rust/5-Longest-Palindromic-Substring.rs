impl Solution {
    pub fn longest_palindrome(s: String) -> String {
        let s = s.chars().collect::<Vec<char>>();
        let (mut left, mut right, length): (i32, i32, i32) = (0, 0, s.len() as i32);

        if length == 1 {
            return s[0].to_string();
        }

        for i in 0..length {
            // odd length
            let (mut l, mut r) = (i, i);

            while l >= 0 && r < length && s[l as usize] == s[r as usize] {
                if r - l > right - left {
                    left = l;
                    right = r;
                }
                l -= 1;
                r += 1;
            }

            // even length
            let (mut l, mut r) = (i, i + 1);

            while l >= 0 && r < length && s[l as usize] == s[r as usize] {
                if r - l > right - left {
                    left = l;
                    right = r;
                }
                l -= 1;
                r += 1;
            }
        }

        s[left as usize..=right as usize].iter().collect::<String>()
    }
}
