#![cfg_attr(debug_assertions, allow(dead_code, unused_imports))]
use std::collections::BTreeMap;
use std::iter::FromIterator;

pub struct Solution;
impl Solution {
    pub fn top_k_frequent(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let mut map: BTreeMap<i32, i32> = BTreeMap::new();
        for num in &nums {
            if map.contains_key(num) {
                continue;
            }
            let num_count = nums.iter().filter(|x| *x == num).count();
            map.entry(*num).or_insert(num_count as i32);
        }
        let mut v = Vec::from_iter(map);
        v.sort_by(|&(_, a), &(_, b)| b.cmp(&a));
        let mut s: Vec<i32> = Vec::with_capacity(k as usize);
        println!("{:#?}", v);

        for n in v.iter().take(k as usize) {
            s.push(n.0);
        }
        s
    }
}
