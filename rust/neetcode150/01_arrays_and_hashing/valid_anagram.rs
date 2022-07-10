#![cfg_attr(debug_assertions, allow(dead_code, unused_imports))]
pub struct Solution;
impl Solution {
    pub fn is_anagram(s: String, mut t: String) -> bool {
        if s.len() != t.len() {
            return false;
        }
        for char in s.chars() {
            if !t.contains(char) {
                return false;
            } else {
                // Already checked that the character exist
                // can unwrap safely
                t.remove(t.find(char).unwrap());
            }
        }
        true
    }
}
