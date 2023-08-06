impl Solution {
    pub fn longest_increasing_path(matrix: Vec<Vec<i32>>) -> i32 {
        use std::cmp::max;
        use std::collections::HashMap;

        let mut dp: HashMap::<(usize, usize), i32> = HashMap::new();

        fn dfs(
            r: usize,
            c: usize,
            prevVal: i32,
            matrix: &[Vec<i32>],
            dp: &mut HashMap<(usize, usize), i32>,
        ) -> i32 {
            if r < 0
                || r >= matrix.len()
                || c < 0
                || c >= matrix[0].len()
                || matrix[r][c] <= prevVal
            {
                return 0;
            }
            if let Some(&result) = dp.get(&(r, c)) {
                return result;
            }

            let mut res = 1;
            res = max(res, 1 + dfs(r + 1, c, matrix[r][c], matrix, dp));
            res = max(res, 1 + dfs(r - 1, c, matrix[r][c], matrix, dp));
            res = max(res, 1 + dfs(r, c + 1, matrix[r][c], matrix, dp));
            res = max(res, 1 + dfs(r, c - 1, matrix[r][c], matrix, dp));
            dp.insert((r, c), res);
            res
        }

        for r in 0..matrix.len() {
            for c in 0..matrix[0].len() {
                dfs(r, c, -1, &matrix, &mut dp);
            }
        }
        *dp.values().max().unwrap_or(&1)
    }
}
