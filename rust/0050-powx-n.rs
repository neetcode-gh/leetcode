impl Solution {
    pub fn my_pow(x: f64, n: i32) -> f64 {
        fn helper(x: f64, n: i32) -> f64 {
            match (x, n) {
                (0.0, _) => 0.0,
                (_, 0) => 1.0,
                _ => {
                    let res = helper(x * x, n / 2);
                    if n % 2 == 0 {
                        res
                    } else {
                        x * res
                    }
                }
            }
        }

        let res = helper(x, n.abs());

        if n >= 0 {
            res
        } else {
            1.0 / res
        }
    }
}
