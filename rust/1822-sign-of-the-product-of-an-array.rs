impl Solution {
    pub fn array_sign(nums: Vec<i32>) -> i32 {
        let mut neg = 0;

        for n in nums {
            if n == 0 {
                return 0;
            } else if n < 0 {
                neg += 1;
            }
        }

        if neg % 2 == 0 {
            return 1;
        }

        -1
    }
}
