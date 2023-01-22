impl Solution {
    pub fn daily_temperatures(temperatures: Vec<i32>) -> Vec<i32> {
        let mut res = vec![0; temperatures.len()];
        let mut stack: Vec<(i32, usize)> = vec![]; // (temp, index)

        for (i, val) in temperatures.iter().enumerate() {
            while !stack.is_empty() && *val > stack.last().unwrap().0 {
                let (_, stack_index) = stack.pop().unwrap();
                res[stack_index] = (i - stack_index) as i32;
            }

            stack.push((*val, i));
        }
        res
    }
}