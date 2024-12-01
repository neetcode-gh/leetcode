impl Solution {
    pub fn tribonacci(n: i32) -> i32 {
        let mut t = [0, 1, 1];

        if n <= 2 {
            return t[n as usize];
        }

        for i in 3..(n + 1) as usize {
            t.swap(0, 1);
            t.swap(1, 2);
            t[2] = t.iter().sum();
        }

        t[2]
    }
}
