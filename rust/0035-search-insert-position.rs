impl Solution {
    pub fn search_insert(nums: Vec<i32>, target: i32) -> i32 {
        match nums.binary_search(&target) {
            Ok(i) => i as i32,
            Err(i) => i as i32,
        }
    }
}
