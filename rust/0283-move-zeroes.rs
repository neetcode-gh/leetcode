impl Solution {
    pub fn move_zeroes(nums: &mut Vec<i32>) {
        let mut left = 0;

        for r in 0..nums.len() {
            if nums[r] != 0 {
                nums.swap(left, r);
                left += 1;
            }
        }
    }
}
