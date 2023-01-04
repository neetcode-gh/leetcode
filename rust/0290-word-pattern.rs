impl Solution {
    pub fn word_pattern(pattern: String, s: String) -> bool {
        use std::collections::{HashMap, HashSet};

        if pattern.len() != s.split_whitespace().count() {
            return false;
        }

        let mut char_to_word = HashMap::new();
        let mut word_to_char = HashMap::new();

        for (c, word) in pattern.chars().zip(s.split_ascii_whitespace()) {
            if let Some(w) = char_to_word.insert(c, word) {
                if w != word {
                    return false;
                }
            }

            if let Some(w) = word_to_char.insert(word, c) {
                if w != c {
                    return false;
                }
            }
        }
        true
    }
}