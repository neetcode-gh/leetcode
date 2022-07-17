#[derive(Default)]
struct WordDictionary {
    is_word_end: bool,
    children: [Option<Box<WordDictionary>>; 26],
}

impl WordDictionary {

    fn new() -> Self {
        Default::default()
    }
    
    fn add_word(&mut self, word: String) {
        let mut dict = self;
        
        for c in word.chars(){
            dict = dict.children[char_index(c)]
                .get_or_insert(Box::new(WordDictionary::new()))
                .as_mut();
        }
        
        dict.is_word_end = true;
    }
    
    fn search_ref(&self, word: &str) -> bool{
        let mut dict = self;
        
        for (i, c) in word.chars().enumerate(){
            if c == '.'{
                let res = dict.children
                    .iter()
                    .any(|opt|{
                        if let Some(ref next_dict) = opt{
                            next_dict.search_ref(&word[i + 1..])
                        }else{
                            false
                        }
                    });
                
                return res;
            }else{
                if let Some(ref next_dict) = dict.children[char_index(c)]{
                    dict = next_dict.as_ref();
                }else{
                    return false;
                }
            }
        }
        
        dict.is_word_end
    }
    
    fn search(&self, word: String) -> bool {
        self.search_ref(&word)
    }
}

pub fn char_index(c: char) -> usize{
    c as usize - 'a' as usize
}