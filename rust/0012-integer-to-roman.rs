impl Solution {
    pub fn int_to_roman(num: i32) -> String {
        let int = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        let roman = [
            "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I",
        ];
        let mut result = String::new();
        let mut num = num;

        for i in 0..13 {
            if num / int[i] > 0 {
                let count = num / int[i];
                result.push_str(&roman[i].repeat(count as usize));
                num %= int[i];
            }
        }

        result
    }
}
