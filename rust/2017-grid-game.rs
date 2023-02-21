impl Solution {
    pub fn grid_game(grid: Vec<Vec<i32>>) -> i64 {
        let length = grid[0].len();
        let mut top_sum: i64 = grid[0].iter().map(|x| *x as i64).sum();
        let mut bottom_sum: i64 = 0;

        let mut ans = i64::MAX;
        for i in 0..length {
            top_sum -= grid[0][i] as i64;

            let max_player2_score = std::cmp::max(top_sum, bottom_sum);
            ans = std::cmp::min(max_player2_score, ans);

            bottom_sum += grid[1][i] as i64;
        }

        ans
    }
}
