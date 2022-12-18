use std::collections::HashMap;

impl Solution {
    pub fn min_window(s: String, t: String) -> String {
        let s: Vec<char> = s.chars().collect();

        if t == String::new() || s.len() < t.len() {
            return String::new();
        }

        let (mut l, mut res, mut res_len) = (0, (-1 as i32, -1 as i32), usize::MAX);
        let mut count_t: HashMap<char, u64> = HashMap::new();
        let mut window: HashMap<char, u64> = HashMap::new();

        for c in t.chars() {
            *count_t.entry(c).or_default() += 1;
        }

        let (mut have, need) = (0, count_t.len());

        for r in 0..s.len() {
            let c = s[r];

            *window.entry(c).or_default() += 1;
            have += (window.get(&c) == count_t.get(&c)) as usize;

            while have == need {
                if (r - l + 1) < res_len {
                    res = (l as i32, r as i32);
                }
                res_len = res_len.min(r - l + 1);
                *window.get_mut(&s[l]).unwrap() -= 1;

                if window.get(&s[l]) < count_t.get(&s[l]) {
                    have -= 1;
                }

                l += 1;
            }
        }

        if res.0 > -1 && res.1 > -1 {
            return s[res.0 as usize..=res.1 as usize]
                .into_iter()
                .collect::<String>();
        }

        String::new()
    }
}
