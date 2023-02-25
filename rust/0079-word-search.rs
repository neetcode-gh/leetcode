#[inline(always)]
pub fn encode(c : char) -> u8 {
    c as u8 - b'A' + 1
}

#[inline]
pub fn encode_word(mut word : String, counter : &mut [i8]) -> u128 {
    let mut res : u128 = 0;
    let end_char = encode(word.chars().next_back().unwrap()) as usize;
    let start_char = encode(word.chars().next().unwrap()) as usize;
    
    if counter[end_char] > counter[start_char] {
        while let Some(c) = word.pop() {
            res <<= 6;
            let byte = encode(c);
            counter[byte as usize] -= 1;
            res |= byte as u128;
        }
    } else {
        for c in word.chars() {
            res <<= 6;
            let byte = encode(c);
            counter[byte as usize] -= 1;
            res |= byte as u128;
        }
    }
    
    res
}

impl Solution {
    pub fn exist(board: Vec<Vec<char>>, word: String) -> bool {
        if board.len() * board[0].len() < word.len() {
            return false;
        }
        
        let mut counter : [i8; 60] = [0; 60];
        let board : Vec<Vec<u8>> = board
                                    .into_iter()
                                    .map(|row| 
                                        row.into_iter().map(|ele| {
                                                let mut res = encode(ele);
                                                counter[res as usize] += 1;
                                                res
                                            })
                                        .collect()
                                    ).collect();
        
        let word = encode_word(word, &mut counter);
        
        if counter.into_iter().any(|&count| count < 0) {
           return false; 
        }
        
        let mut visited : Vec<Vec<bool>> = vec![vec![false; board[0].len()]; board.len()];
        
        for i in 0..board.len() {
            for j in 0..board[0].len() {
                if Self::backtrack(word, &board, i, j, &mut visited) {
                    return true;
                }
            }
        }
        
        false
    }
    
    #[inline(always)]
    pub fn backtrack(
        mut word : u128, 
        board : &[Vec<u8>], 
        i : usize, j : usize, 
        visited : &mut [Vec<bool>]
    ) -> bool {
        if i >= board.len() || j >= board[i].len() || word as u8 & 0b111111 != board[i][j] || visited[i][j] {
            return false;
        }
        
         visited[i][j] = true;    
        
        ({ word >>= 6; word == 0 } )
        ||(Self::backtrack(word, board, i + 1, j, visited) )
        ||(Self::backtrack(word, board, i, j + 1, visited) )
        ||(Self::backtrack(word, board, i - 1, j, visited) )
        ||(Self::backtrack(word, board, i, j - 1, visited) )
        ||({
            visited[i][j] = false;
            false
        })
        
    }
}
