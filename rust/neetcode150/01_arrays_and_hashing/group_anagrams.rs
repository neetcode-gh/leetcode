#![cfg_attr(debug_assertions, allow(dead_code, unused_imports))]
use std::collections::{BTreeMap, HashMap};
use std::iter::FromIterator;

pub struct Solution;
impl Solution {
    pub fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {
        let mut groups: HashMap<Vec<u32>, Vec<String>> = HashMap::new();
        for s in strs {
            let mut key = [0; 26];
            for c in s.as_bytes() {
                key[(c - b'a') as usize] += 1;
            }
            groups.entry(key.to_vec()).or_insert(vec![]).push(s);
        }
        groups.into_values().collect()
    }
}
