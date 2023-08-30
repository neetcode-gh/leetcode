use std::collections::HashSet;
impl Solution {
    fn contains_nearby_duplicate(nums: Vec<i32>, k: i32) -> bool {
        let mut window = HashSet::new();
        let mut l = 0;

        for (r, &num) in nums.iter().enumerate() {
            if r as i32 - l as i32 > k {
                window.remove(&nums[l]);
                l += 1;
            }
            if window.contains(&num) {
                return true;
            }
            window.insert(num);
        }
        false
    }
}