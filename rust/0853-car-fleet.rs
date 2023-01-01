impl Solution {
    pub fn car_fleet(target: i32, position: Vec<i32>, speed: Vec<i32>) -> i32 {
        let mut position_speed_pair: Vec<(f64, f64)> = position
            .iter()
            .map(|x| *x as f64)
            .zip(speed.iter().map(|x| *x as f64))
            .collect();

        position_speed_pair.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());

        let mut stack = vec![];
        for (pos, speed) in position_speed_pair.iter().rev() {
            stack.push((target as f64 - pos) / speed);
            if stack.len() >= 2 && stack.last() <= stack.get(stack.len() - 2) {
                stack.pop();
            }
        }
        stack.len() as i32
    }
}