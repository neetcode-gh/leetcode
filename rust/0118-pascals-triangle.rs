impl Solution {
    pub fn generate(num_rows: i32) -> Vec<Vec<i32>> {
        let mut ans: Vec<Vec<i32>> = Vec::new();
        for line in 1..=num_rows {
            let mut c = 1;
            let mut v: Vec<i32> = Vec::new();
            for i in 1..=line {
                v.push(c);
                c = c * (line - i) / i;
            }
            ans.push(v.clone());
        }
        ans
    }
}
