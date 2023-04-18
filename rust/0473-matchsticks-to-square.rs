impl Solution {
    pub fn makesquare(matchsticks: Vec<i32>) -> bool {
        fn backtrack(
            sides: &mut [i64; 4],
            matches: &Vec<i32>,
            idx: usize,
            length: i64
        ) -> bool {
            if idx >= matches.len() {
                return true
            }

            for i in 0..4 {
                if sides[i] + matches[idx] as i64 <= length {
                    sides[i] += matches[idx] as i64;
                    if backtrack(sides, matches, idx + 1, length) {
                        return true
                    }
                    sides[i] -= matches[idx] as i64
                }
            }
            false
        }

        let mut total = 0;
        for mat in matchsticks.iter() {
            total += *mat as i64;
        }
        let mut matchsticks = matchsticks;
        matchsticks.sort_by_key(|e| std::cmp::Reverse(*w));

        let side = total / 4;

        backtrack(&mut [0, 0, 0, 0], &matchsticks, 0, side)
    }
}