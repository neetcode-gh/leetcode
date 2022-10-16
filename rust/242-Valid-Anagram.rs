use std::collections::HashMap;

impl Solution {
    pub fn is_anagram(s: String, t: String) -> bool {
        if (t.len() != s.len()){
            return false;
        }
        
        let mut map: HashMap<char, usize> = HashMap::new();
        
        for (a, b) in s.chars().zip(t.chars()){
            *map.entry(a).or_default() +=1;
            *map.entry(b).or_default() -=1;
        }
        
        map.into_values().all(|cnt| cnt == 0)
    }
}