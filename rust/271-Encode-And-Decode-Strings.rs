struct Codec {}

impl Codec {
    fn new() -> Self {
        Self {}
    }
	
    fn encode(&self, strs: Vec<String>) -> String {
        let mut store = String::new();
        
        for s in strs{
            let len = s.len() as u8;
            
            store.push(len as char);
            store.push_str(&s);
        }
        
        store
    }
	
    fn decode(&self, s: String) -> Vec<String> {
        let s: Vec<char> = s.chars().collect();
        let mut i = 0;
        
        let mut res = vec![];
        while i < s.len(){
            let len = s[i] as u8 as usize;
            i+=1;
            
            let j = i + len;
            
            if j <= s.len(){
                let slice = &s[i..i + len];
                res.push(slice.into_iter().collect::<String>());
            }
          
            i+=len;
        }
        
        res
    }
}