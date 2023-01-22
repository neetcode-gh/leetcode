impl Solution {
    pub fn find_disappeared_numbers(nums: Vec<i32>) -> Vec<i32> {
        let mut nums = nums;
        for i in 0..nums.len() {
            let j = nums[i].abs() - 1;
            nums[j as usize] = -1 * nums[j as usize].abs();
        }

        let mut result: Vec<i32> = vec![];

        for (index, number) in nums.iter().enumerate() {
            if *number > 0 {
                result.push((index + 1) as i32);
            }
        }
        result
    }
}