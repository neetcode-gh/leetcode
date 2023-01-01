impl Solution {
    pub fn plus_one(mut digits: Vec<i32>) -> Vec<i32> {
        let mut carry : u8 = 1;
        
        digits = digits
                .into_iter()
                .rev()
                .map(
                        |digit| {
                            let val : u8 = digit as u8 + carry;
                            carry = val / 10;
                            (val % 10) as i32
                    }
                )
                .collect();
        digits.reverse();

        if carry == 1 {
            digits.insert(0, 1);
        }
        digits
    }
}
