use std::collections::HashMap;
impl Solution {
    pub fn least_bricks(wall: Vec<Vec<i32>>) -> i32 {
        wall.len() as i32
            - wall
                .into_iter()
                .map(|row| {
                    let mut prefix: Vec<_> = row
                        .into_iter()
                        .scan(0, |sum, x| {
                            *sum += x;
                            Some(*sum)
                        })
                        .collect();
                    prefix.pop();
                    prefix
                })
                .flatten()
                .fold(HashMap::from([(0, 0)]), |mut acc, x| {
                    acc.entry(x).and_modify(|cnt| *cnt += 1).or_insert(1);
                    acc
                })
                .into_iter()
                .map(|(_, v)| v)
                .max()
                .unwrap()
    }
}
