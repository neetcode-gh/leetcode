impl Solution {
    pub fn min_flips_mono_incr(s: String) -> i32 {
        let (mut res, mut count_one) = (0, 0);

        for ch in s.chars() {
            if ch == '1' {
                count_one += 1;
            } else {
                res = i32::min(res + 1, count_one);
            }
        }
        res
    }
}