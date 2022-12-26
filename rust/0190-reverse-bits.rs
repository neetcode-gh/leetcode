impl Solution {
    pub fn reverse_bits(mut x: u32) -> u32 {
        (0..32).fold(0, |mut res, _| {
            res = (res << 1) | (x & 1);
            x >>= 1;
            res
        })
    }
}
