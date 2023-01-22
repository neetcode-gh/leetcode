pub fn encode(word : String) -> u64 {
    word.into_bytes().into_iter().fold(0, |mut acc, c|{
        acc <<= 5;
        acc | (c - b'a' + 1) as u64
    })
}

use std::collections::HashSet;
use std::collections::VecDeque;

impl Solution {
    pub fn ladder_length(begin_word: String, end_word: String, word_list: Vec<String>) -> i32 {
        let word_len = begin_word.len();
        let begin_word = encode(begin_word);
        let end_word = encode(end_word);
        
        let mut word_list : HashSet<u64> = word_list.into_iter().map(|word| encode(word)).collect();
        let mut frontier : VecDeque<u64> = VecDeque::with_capacity(5000);
        let mut seen : HashSet<u64> = HashSet::new();
        let mut res = 1;
        
        frontier.push_back(begin_word);
        while !frontier.is_empty() {
            let len = frontier.len();
            for _ in 0..len {
                let curr = frontier.pop_front().unwrap();
                if curr == end_word {
                    return res;
                }
                
                for i in 0..word_len {
                    let filter = !(0b11111 << (i * 5));
                    for character in 1..=26 {
                        let neighbour = ((curr & filter) | (character << (i * 5)));
                        if word_list.contains(&neighbour) && !seen.contains(&neighbour) {
                            frontier.push_back(neighbour);
                            seen.insert(neighbour);
                        }
                    }
                }
                
            }
            res += 1;
        }
        0
    }
}
