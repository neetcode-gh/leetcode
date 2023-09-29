use std::collections::HashMap;

impl Solution {
    pub fn find_anagrams(s: String, p: String) -> Vec<i32> {
        let mut start_index = 0;
        let mut s_map: HashMap<char, i32> = HashMap::new();
        let mut p_map: HashMap<char, i32> = HashMap::new();
        let mut res: Vec<i32> = Vec::new();
        
        for char in p.chars() {
            *p_map.entry(char).or_insert(0) += 1;
        }
        
        let s_chars: Vec<char> = s.chars().collect();
        
        for i in 0..s_chars.len() {
            let char = s_chars[i];
            *s_map.entry(char).or_insert(0) += 1;
            
            if i >= p.len() - 1 {
                if s_map == p_map {
                    res.push(start_index as i32);
                }
                
                if s_map.contains_key(&s_chars[start_index]) {
                    let entry = s_map.entry(s_chars[start_index]).or_insert(0);
                    *entry -= 1;
                    if *entry == 0 {
                        s_map.remove(&s_chars[start_index]);
                    }
                }
                
                start_index += 1;
            }
        }
        
        res
    }
}