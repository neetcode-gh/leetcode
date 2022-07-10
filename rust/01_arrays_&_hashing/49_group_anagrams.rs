use std::collections::HashMap;

impl Solution {
    pub fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {
        let mut map: HashMap<[u16; 26], Vec<String>> = HashMap::new();
        
        for s in strs{
            let mut key = [0_u16; 26];
    
            for c in s.chars(){
                key[c as usize - 'a' as usize] += 1;
            }
            
            if let Some(vals) = map.get_mut(&key){
                vals.push(s);
            }else{
                map.insert(key, vec![s]);
            }
        }
        
        map.into_values().collect::<Vec<Vec<String>>>()
    }
}