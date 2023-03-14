use std::collections::HashSet;
use std::iter::FromIterator;

impl Solution {
    pub fn find_all_concatenated_words_in_a_dict(words: Vec<String>) -> Vec<String> {
        let word_set: HashSet<String> = HashSet::from_iter(words.iter().cloned());
        let mut res = vec![];

        for w in words {
            if Self::dfs(&w, &word_set) {
                res.push(w);
            }
        }

        res
    }

    pub fn dfs(word: &str, word_set: &HashSet<String>) -> bool {
        for i in 1..word.len() {
            let (prefix, suffix) = (&word[..i], &word[i..]);
            if (word_set.contains(prefix) && word_set.contains(suffix))
                || (word_set.contains(prefix) && Self::dfs(suffix, word_set))
            {
                return true;
            }
        }
        false
    }
}
