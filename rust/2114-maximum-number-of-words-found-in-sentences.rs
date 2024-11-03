impl Solution {
    pub fn most_words_found(sentences: Vec<String>) -> i32 {
       let mut most = 0;
       for sentence in sentences {
           let size = sentence.split_whitespace().count();
           if size > most {
               most = size;
           }
       }
       return most as i32;
    }
}
