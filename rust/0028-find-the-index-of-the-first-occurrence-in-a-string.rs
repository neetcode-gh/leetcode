impl Solution {
    pub fn str_str(haystack: String, needle: String) -> i32 {
        if needle.is_empty() {
            return 0;
        }

        let haystack_bytes = haystack.as_bytes();
        let needle_bytes = needle.as_bytes();

        let mut lps = vec![0; needle_bytes.len()];
        let mut prev_lps = 0;
        let mut i = 1;

        while i < needle_bytes.len() {
            match needle_bytes[i] == needle_bytes[prev_lps] {
                true => {
                    lps[i] = prev_lps + 1;
                    prev_lps += 1;
                    i += 1;
                }
                false if prev_lps == 0 => {
                    lps[i] = 0;
                    i += 1;
                }
                false => {
                    prev_lps = lps[prev_lps - 1];
                }
            }
        }

        let mut i = 0;
        let mut j = 0;

        while i < haystack_bytes.len() {
            match haystack_bytes[i] == needle_bytes[j] {
                true => {
                    i += 1;
                    j += 1;
                }
                false if j == 0 => {
                    i += 1;
                }
                false => {
                    j = lps[j - 1];
                }
            }

            if j == needle_bytes.len() {
                return (i - j) as i32;
            }
        }

        -1
    }
}
