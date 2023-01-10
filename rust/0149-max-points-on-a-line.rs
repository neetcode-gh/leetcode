use std::collections::HashMap;

impl Solution {
    pub fn max_points(points: Vec<Vec<i32>>) -> i32 {
        let mut res = 1;

        for i in 0..points.len() {
            let point1 = &points[i];
            let mut count = HashMap::new();
            for j in (i + 1)..points.len() {
                let point2 = &points[j];
                let slope;
                if point2[0] == point1[0] {
                    slope = i32::MAX;
                } else {
                    slope = ((point2[1] as f64 - point1[1] as f64)
                        / (point2[0] as f64 - point1[0] as f64)
                        * 100000.0) as i32;
                }

                *count.entry(slope).or_insert(1) += 1;
                res = res.max(*count.get(&slope).unwrap());
            }
        }
        res
    }
}