#![cfg_attr(debug_assertions, allow(dead_code, unused_imports))]
use std::collections::HashMap;

pub struct Solution;
impl Solution {
    pub fn top_k_frequent(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let mut map: HashMap<i32, usize> = HashMap::new();
        for num in &nums {
            *map.entry(*num).or_insert(0) += 1;
        }
        let mut bucket = vec![vec![]; nums.len()];
        for (num, count) in map {
            bucket[count - 1].push(num);
        }

        bucket
            .into_iter()
            .rev()
            .flatten()
            .take(k as usize)
            .collect()
    }
}
