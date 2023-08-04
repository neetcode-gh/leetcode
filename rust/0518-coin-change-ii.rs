impl Solution {
    // Time O(m*n) - Space O(n)
    pub fn change(amount: i32, coins: Vec<i32>) -> i32 {
        let n = amount as usize;
        let mut dp = vec![0; n + 1];
        dp[0] = 1;
        let mut c: usize;
        for coin in coins {
            c = coin as usize;
            for i in c..=n {
                dp[i] += dp[i - c];
            }
        }
        *dp.last().unwrap()
    }
}
