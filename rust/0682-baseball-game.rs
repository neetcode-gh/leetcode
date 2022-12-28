impl Solution {
    pub fn cal_points(operations: Vec<String>) -> i32 {
        let mut points: Vec<i32> = Vec::new();

        for op in operations {
            match &op[..] {
                "D" => {
                    let new_point = points.last().unwrap();
                    points.push(*new_point * 2);
                }

                "C" => {
                    points.pop();
                }
                "+" => {
                    let len = points.len();
                    points.push(points[len - 1] + points[len - 2]);
                }
                _ => {
                    points.push(op.parse::<i32>().unwrap());
                }
            }
        }

        points.iter().sum()
    }
}