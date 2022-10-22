impl Solution {
    pub fn missing_number(nums: Vec<i32>) -> i32 {
        let length = nums.len() as i32;
        let mut ans = length;
        for i in 0..length {
            ans ^= i ^ nums[i as usize];
        }
        ans
    }
}
