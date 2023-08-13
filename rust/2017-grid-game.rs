impl Solution {
    pub fn grid_game(grid: Vec<Vec<i32>>) -> i64 {
        let n = grid[0].len();

        let mut memo1 = vec![0;n+1];
        let mut memo2 = vec![0;n+1];
        for i in 0..n {
            memo1[i+1] = memo1[i] + grid[0][i] as i64;
            memo2[i+1] = memo2[i] + grid[1][i] as i64;
        }

        let mut result = i64::max_value();
        for i in 0..n {
            result = result.min(memo2[i].max(memo1[n] - memo1[i+1]));
        }

        result
    }
}
