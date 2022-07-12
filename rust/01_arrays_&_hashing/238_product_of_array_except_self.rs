impl Solution {
    pub fn product_except_self(mut nums: Vec<i32>) -> Vec<i32> {
        let mut res = vec![1; nums.len()];
        
        for i in (1..nums.len()){
            res[i] = nums[i - 1] * res[i - 1];
        }

        let mut right = 1;

        for (i, n) in res.iter_mut().enumerate().rev(){
            *n = *n * right;
            right *= nums[i];
        }
        
        res
    }
}