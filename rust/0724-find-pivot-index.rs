impl Solution {
    pub fn pivot_index(nums: Vec<i32>) -> i32 {
        let total: i32 = nums.iter().sum();
        let mut left_sum = 0;

        for (i, num) in nums.iter().enumerate() {
            let right_sum = total - num - left_sum;
            if left_sum == right_sum {
                return i as i32;
            }
            left_sum += num;
        }
        -1
    }
}