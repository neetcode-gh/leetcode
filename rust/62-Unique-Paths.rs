impl Solution {
    pub fn unique_paths(m: i32, n: i32) -> i32 {
        let mut bottom = vec![1; n as usize];

        for _ in 0..m - 1 {
            let mut top = vec![1; n as usize];
            for c in (0..n - 1).rev().map(|c| c as usize) {
                top[c] = bottom[c] + top[c + 1];
            }

            bottom = top;
        }

        bottom[0]
    }
}
