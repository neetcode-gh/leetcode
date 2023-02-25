impl Solution {
    pub fn minimum_difference(nums: Vec<i32>, k: i32) -> i32 {
        let mut nums = nums;
        let (mut left, mut right) = (0, (k - 1) as usize);
        let mut res = i32::MAX;

        nums.sort();

        while right < nums.len() {
            res = res.min(nums[right] - nums[left]);
            left += 1;
            right += 1;
        }
        res
    }

    // Idiomatic solution
    pub fn minimum_difference_idiomatic(nums: Vec<i32>, k: i32) -> i32 {
        let mut nums = nums;
        nums.sort();
        nums.windows(k as usize)
            .map(|pair| pair[(k - 1) as usize] - pair[0])
            .min()
            .unwrap()
    }
}
