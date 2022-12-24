impl Solution {
    pub fn count_bits(n: i32) -> Vec<i32> {
        let mut ans = Vec::new();

        for i in 0..=n {
            ans.push(set_bits(i));
        }

        ans
    }
}

pub fn set_bits(mut n: i32) -> i32 {
    let mut count = 0;

    while n > 0 {
        n = n & (n - 1);
        count += 1;
    }

    count
}

