#![cfg_attr(debug_assertions, allow(dead_code, unused_imports))]
use std::collections::HashMap;
use std::iter::FromIterator;

pub struct Solution;
impl Solution {
    pub fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {
        let mut anagrams = HashMap::new();
        for word in &strs {
            let mut chars: Vec<char> = word.chars().collect();
            chars.sort_unstable();
            let word_sorted: String = chars.into_iter().collect();
            anagrams
                .entry(word_sorted)
                .or_insert(Vec::new())
                .push(word.to_owned());
        }
        Vec::from_iter(anagrams.into_values())
    }
}
