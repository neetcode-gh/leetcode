impl Solution {
    pub fn remove_duplicates(nums: &mut Vec<i32>) -> i32 {
             let mut dup_count = 0;

        for i in 1..nums.len() {
            if nums[i] == nums[i - 1] {
                dup_count += 1
            }

            nums[i - dup_count] = nums[i];
        }

        (nums.len() - dup_count) as i32
    }
}