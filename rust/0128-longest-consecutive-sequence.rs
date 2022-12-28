use std::{
    collections::HashSet,
    iter::FromIterator,
};

impl Solution {
    pub fn longest_consecutive(nums: Vec<i32>) -> i32 {
        let mut set : HashSet<i32> = HashSet::from_iter(nums.into_iter());
        
        let mut max_cnt = 0;
        
        for n in &set{
            if !set.contains(&(n-1)){
                let mut next = n + 1;
                let mut cnt = 1;
                while set.contains(&next){
                    cnt +=1;
                    next+=1;
                }
                
                max_cnt = max_cnt.max(cnt);
            }
        }

        max_cnt
    }
}
