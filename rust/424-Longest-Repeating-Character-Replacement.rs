use std::collections::HashMap;

impl Solution {
    pub fn character_replacement(s: String, k: i32) -> i32 {
        let s: Vec<char> = s.chars().collect();
        let (mut res, mut l, mut maxf) = (0, 0, 0);
        let mut count: HashMap<char, u64> = HashMap::new();

        for r in 0..s.len() {
            *count.entry(s[r]).or_default() += 1;
            maxf = maxf.max(*count.get(&s[r]).unwrap());

            while (r - l + 1) - maxf as usize > k as usize {
                *count.get_mut(&s[l]).unwrap() -= 1;
                l += 1;
            }

            res = res.max(r - l + 1);
        }

        res as i32
    }
}

