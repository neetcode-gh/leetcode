pub struct Solution;
impl Solution {
    pub fn contains_duplicate(nums: Vec<i32>) -> bool {
        let mut set = Vec::with_capacity(nums.len());
        for num in &nums {
            if set.contains(num) {
                return true;
            } else {
                set.push(*num);
            }
        }
        false
    }
}
