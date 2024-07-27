impl Solution {
    // Time O(m+n) - Space O(n)
    pub fn str_str(haystack: String, needle: String) -> i32 {
        let m = haystack.len();
        let n = needle.len();
        let h_chars: Vec<char> = haystack.chars().collect();
        let n_chars: Vec<char> = needle.chars().collect();
        // Base case, empty needle.
        if n == 0 {
            return 0;
        }
        // LPS generation section.
        let mut lps: Vec<usize> = vec![0; n];
        let (mut left, mut right) = (0, 1);
        while right < n {
            if n_chars[left] == n_chars[right] {
                // If the characters match the lps is one character longer.
                lps[right] = left + 1;
                left += 1;
                right += 1;
            } else if left == 0 {
                // If they don't match and the left pointer is at the start,
                // no characters match.
                lps[right] = 0;
                right += 1;
            } else {
                // Otherwise, we need to check the previous lps.
                left = lps[left - 1];
            }
        }
        // Here we start the KMP proper.
        let (mut haystack_idx, mut needle_idx) = (0, 0);
        while haystack_idx < m {
            if h_chars[haystack_idx] == n_chars[needle_idx] {
                haystack_idx += 1;
                needle_idx += 1;
            } else if needle_idx == 0 {
                haystack_idx += 1;
            } else {
                needle_idx = lps[needle_idx - 1];
            }
            if needle_idx == n {
                return (haystack_idx - n) as i32;
            }
        }
        -1
    }
}
