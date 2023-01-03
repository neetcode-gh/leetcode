#[derive(Default)]
struct Trie {
    is_word_end: bool,
    children: [Option<Box<Trie>>; 26],
}

impl Trie {

    fn new() -> Self {
        Self{ ..Default::default() }
    }
    
    fn insert(&mut self, word: String) {
        let mut trie = self;
        
        for c in word.chars(){
            trie = trie.children[char_index(c)]
                .get_or_insert(Box::new(Trie::new()))
                .as_mut();
        }
        
        trie.is_word_end = true;
    }
    
    fn search(& self, word: String) -> bool {
        let mut trie = self;
        
        for c in word.chars(){
            if let Some(ref next_trie) = trie.children[char_index(c)]{
                trie = next_trie.as_ref();
            }else{
                return false;
            }
        }
        
        trie.is_word_end
    }
    
    fn starts_with(&self, prefix: String) -> bool {
        let mut trie = self;
        
        for c in prefix.chars(){
            if let Some(ref next_trie) = trie.children[char_index(c)]{
                trie = next_trie.as_ref();
            }else{
                return false;
            }
        }
        
        true
    }
}

pub fn char_index(c: char) -> usize{
    c as usize - 'a' as usize
}