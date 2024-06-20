impl Solution {
    pub fn is_palindrome(x: i32) -> bool {
        if x < 0 {
            return false;
        }

        let mut div: i64 = 1;
        while i64::from(x) >= div * 10 {
            div *= 10;
        }

        let mut x: i64 = i64::from(x);

        while x != 0 {
            let left = x / div;
            let right = x % 10;
            if left != right {
                return false;
            }
            x = (x % div) / 10;
            div /= 100;
        }

        true
    }
}
