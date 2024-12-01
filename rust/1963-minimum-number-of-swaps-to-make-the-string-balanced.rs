impl Solution {
    pub fn min_swaps(s: String) -> i32 {
        let mut extra_close = 0;
        let mut max_close = 0;

        for c in s.chars() {
            if c == '[' {
                extra_close -= 1;
            } else {
                extra_close += 1;
            }

            max_close = max_close.max(extra_close);
        }

        (max_close + 1) / 2
    }
}