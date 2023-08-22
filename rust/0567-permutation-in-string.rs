impl Solution {
    pub fn check_inclusion(s1: String, s2: String) -> bool {
        if s1.len() > s2.len() {
            return false;
        }

        let (mut s1_cnt, mut s2_cnt) = ([0; 26], [0; 26]);
        for i in 0..s1.len() {
            s1_cnt[s1.chars().nth(i).unwrap() as usize - 'a' as usize] += 1;
            s2_cnt[s2.chars().nth(i).unwrap() as usize - 'a' as usize] += 1;
        }

        let mut matches = 0;
        for i in 0..26 {
            matches = if s1_cnt[i] == s2_cnt[i] { matches + 1 } else { matches };
        }

        let mut l = 0;
        for r in s1.len()..s2.len() {
            if matches == 26 {
                return true;
            }

            let mut index = s2.chars().nth(r).unwrap() as usize - 'a' as usize;
            s2_cnt[index] += 1;
            if s1_cnt[index] == s2_cnt[index] {
                matches += 1;
            } else if s1_cnt[index] + 1 == s2_cnt[index]{
                matches -= 1;
            }

            index = s2.chars().nth(l).unwrap() as usize - 'a' as usize;
            s2_cnt[index] -= 1;
            if s1_cnt[index] == s2_cnt[index] {
                matches += 1;
            } else if s1_cnt[index] - 1 == s2_cnt[index]{
                matches -= 1;
            }

            l += 1;
        }

        matches == 26
    }
}
