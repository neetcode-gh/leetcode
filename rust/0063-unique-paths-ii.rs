impl Solution {
    // Time O(m*n) - Space O(n)
    pub fn unique_paths_with_obstacles(obstacle_grid: Vec<Vec<i32>>) -> i32 {
        let n = obstacle_grid[0].len();
        let mut dp = vec![0; n + 1];
        dp[1] = 1;
        for row in obstacle_grid {
            for i in 1..dp.len() {
                if row[i - 1] == 1 {
                    dp[i] = 0;
                } else {
                    dp[i] += dp[i - 1];
                }
            }
        }
        *dp.last().unwrap()
    }
}
