impl Solution {
    pub fn rob(nums: Vec<i32>) -> i32 {
        nums.into_iter()
            .fold((0, 0), |loot, money| (loot.1, loot.1.max(loot.0 + money)))
            .1
    }
}



 - 
  


