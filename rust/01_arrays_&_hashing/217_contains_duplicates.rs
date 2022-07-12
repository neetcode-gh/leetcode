use std::collections::HashSet;

impl Solution {
    pub fn contains_duplicate(nums: Vec<i32>) -> bool {
        let mut map = HashSet::new();
        
        for n in nums.iter(){

            if map.contains(n){
                return true; 
            }
            
            map.insert(n);          
        };        
        
        false   
    }
}