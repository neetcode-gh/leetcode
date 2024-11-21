impl Solution {
    pub fn min_distance(word1: String, word2: String) -> i32 {
        use std::cmp::min;
        let (m, n) = (word1.len(), word2.len());
        let w1: Vec<char> = word1.chars().collect();
        let w2: Vec<char> = word2.chars().collect();
        let mut dp: Vec<usize> = (0..m + 1).collect();
        let mut temp;
        for i in 0..n {
            temp = vec![0; m + 1];
            temp[0] = i + 1;
            for j in 0..m {
                temp[j + 1] = if w1[j] == w2[i] {
                    dp[j]
                } else {
                    min(temp[j], min(dp[j + 1], dp[j])) + 1
                };
            }
            dp = temp;
        }
        dp[dp.len() - 1] as i32
    }
}
