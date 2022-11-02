impl Solution {
    pub fn get_sum(a: i32, b: i32) -> i32 {
        fn recurse(a: i32, b: i32) -> i32 {
            if (a & b) << 1 == 0 {
                return a ^ b;
            }

            recurse(a ^ b, (a & b) << 1)
        }

        recurse(a, b)
    }
}
