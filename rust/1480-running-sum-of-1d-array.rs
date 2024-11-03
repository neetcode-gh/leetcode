impl Solution {
    pub fn running_sum(nums: Vec<i32>) -> Vec<i32> {
        let mut total = 0;
        let mut arr = Vec::new();
        for n in nums {
            total += n;
            arr.push(total);
        }
        return arr;
    }
}
