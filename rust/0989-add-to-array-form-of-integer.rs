impl Solution {
    pub fn add_to_array_form(num: Vec<i32>, k: i32) -> Vec<i32> {
        let mut num: Vec<i32> = num.into_iter().rev().collect();
        let mut k = k;
        let mut i = 0;

        while k > 0 {
            let digit = k % 10;

            if i < num.len() {
                num[i] += digit;
            } else {
                num.push(digit);
            }

            let carry = num[i] / 10;
            num[i] = num[i] % 10;

            k /= 10;
            k += carry;
            i += 1;
        }

        num.into_iter().rev().collect()
    }
}