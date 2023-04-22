impl Solution {
    pub fn get_concatenation(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut ans = vec![0; 2 * n];

        for i in 0..nums.len() {
            ans[i] = nums[i];
            ans[i + n] = nums[i];
        }

        ans
    }
}
