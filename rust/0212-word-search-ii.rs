#[derive(Default, Debug, Clone)]
struct Trie {
    is_word_end: bool,
    children: [Option<Box<Trie>>; 26],
}

impl Solution {
    pub fn find_words(mut board: Vec<Vec<char>>, words: Vec<String>) -> Vec<String> {
        let mut trie = Trie::new();
        let (m, n) = (board.len(), board[0].len());
        
        for word in words{
            trie.insert(word);
        }
        
        let mut word = String::new();
        let mut res = vec![];
        
        for i in 0..m{
            for j in 0..n{
                Self::dfs(&mut board, &mut trie, &mut res, &mut word,  i, j);
            }
        }
        res
    }
    
    pub fn dfs(
        board: &mut Vec<Vec<char>>, 
        mut trie: &mut Trie, 
        res: &mut Vec<String>, 
        word: &mut String, 
        i: usize, 
        j: usize
    ){
        let (m, n) = (board.len(), board[0].len());
        
        if  i!= usize::MAX && 
            j!= usize::MAX && 
            i < m && 
            j < n && 
            board[i][j] != '#'
        {
            let c = board[i][j];
            
            // mark as visited
            board[i][j] = '#';

            if let Some(ref mut curr_trie) = trie.children[char_index(c)]{
                trie = curr_trie.as_mut();
            
                word.push(c);
                
                if trie.is_word_end{
                    res.push(word.clone());
                    trie.is_word_end = false;
                }
                
                for (x, y) in [(i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)]{
                    Self::dfs(board, trie, res, word, x, y);
                }
                
                word.pop();
                
            }
            
            board[i][j] = c;
            
        }
    }
}

impl Trie {

    fn new() -> Self {
        Default::default()
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
}

pub fn char_index(c: char) -> usize{
    c as usize - 'a' as usize
}