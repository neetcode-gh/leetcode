impl Solution {
    pub fn add_binary(a: String, b: String) -> String {
        let mut res = String::new();
        let mut carry = 0;

        let (mut a, mut b) = (a.as_bytes().to_owned(), b.as_bytes().to_owned());
        a.reverse();
        b.reverse();

        for i in 0..a.len().max(b.len()) {
            let digit_a = if i < a.len() { a[i] - b'0' } else { 0 };
            let digit_b = if i < b.len() { b[i] - b'0' } else { 0 };

            let total = digit_a + digit_b + carry;
            let char = (total % 2).to_string();
            res = char + &res;
            carry = total / 2
        }

        if carry != 0 {
            res = "1".to_string() + &res;
        }
        res
    }
}