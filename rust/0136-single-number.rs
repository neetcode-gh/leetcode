impl Solution {
    pub fn single_number(nums: Vec<i32>) -> i32 {
        let mut res = 0;
        for n in nums {
            res ^= n;
        }
        res
    }
}
