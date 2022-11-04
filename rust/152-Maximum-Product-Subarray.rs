impl Solution {
    pub fn max_product(nums: Vec<i32>) -> i32 {
        let (mut res, mut big, mut small) = (*nums.iter().max().unwrap(), 1, 1);
        for n in nums {
            let tmp = big;
            big = vec![n, big * n, small * n].into_iter().max().unwrap();
            small = vec![n, tmp * n, small * n].into_iter().min().unwrap();
            res = res.max(big);
        }
        res
    }
}
