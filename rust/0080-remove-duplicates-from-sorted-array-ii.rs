impl Solution {
    // Time O(n) - Space O(1)
    pub fn remove_duplicates(nums: &mut Vec<i32>) -> i32 {
        // The maximum number of duplicates allowed.
        const MAX_DUPLICATES: usize = 2;
        // Nothing to do.
        if nums.len() <= MAX_DUPLICATES {
            return nums.len() as i32;
        }
        // A write pointer.
        let mut w = MAX_DUPLICATES;
        for r in MAX_DUPLICATES..nums.len() {
            // Check if the value x positions back is the same.
            if nums[r] != nums[w - MAX_DUPLICATES] {
                nums[w] = nums[r];
                w += 1;
            }
        }
        w as i32
    }
}
