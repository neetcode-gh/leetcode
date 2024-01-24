impl Solution {
    pub fn multiply(num1: String, num2: String) -> String {
        if num1 == "0" || num2 == "0" {
            return String::from('0');
        }

        let n1 = num1.chars().rev().collect::<String>();
        let n2 = num2.chars().rev().collect::<String>();
        let mut res = vec![0; n1.len() + n2.len()];
        for (i1, c1) in n1.chars().enumerate() {
            for (i2, c2) in n2.chars().enumerate() {
                let digit = (c1.to_digit(10).unwrap_or(0) * c2.to_digit(10).unwrap_or(0));
                res[i1 + i2] += digit;
                res[i1 + i2 + 1] += res[i1 + i2] / 10;
                res[i1 + i2] %= 10;
            }
        }

        while let Some(&0) = res.last() {
            res.pop();
        }

        res.into_iter()
            .rev()
            .map(|digit| char::from_digit(digit as u32, 10).unwrap())
            .collect()
    }
}
