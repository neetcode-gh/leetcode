impl Solution {
    pub fn climb_stairs(n: i32) -> i32 {
        std::iter::successors(Some((0, 1)), |dp| Some((dp.1, dp.0 + dp.1)))
            .take((n + 1) as usize)
            .last()
            .unwrap()
            .1
    }
}
