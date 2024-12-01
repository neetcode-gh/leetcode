use std::collections::HashMap;
impl Solution {
    pub fn compute_gcd(mut a: i32, mut b: i32) -> i32 {
        while a > 0 && b > 0 {
            if a > b {
                a %= b;
            } else {
                b %= a;
            }
        }
        if a == 0 {
            b
        } else {
            a
        }
    }
    pub fn interchangeable_rectangles(rectangles: Vec<Vec<i32>>) -> i64 {
        rectangles
            .into_iter()
            .map(|v| {
                let gcd = Solution::compute_gcd(v[0], v[1]);
                (v[0] / gcd, v[1] / gcd)
            })
            .fold(HashMap::new(), |mut dict, t| {
                dict.entry(t).and_modify(|cnt| *cnt += 1).or_insert(1);
                dict
            })
            .into_iter()
            .filter(|(_, v)| *v > 1)
            .map(|(_, v)| v)
            .fold(0, |mut cnt, v| {
                cnt += v * (v - 1) / 2;
                cnt
            })
    }
}
