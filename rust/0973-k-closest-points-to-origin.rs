use std::{cmp::Reverse, collections::BinaryHeap};

impl Solution {
    pub fn k_closest(points: Vec<Vec<i32>>, k: i32) -> Vec<Vec<i32>> {
        let mut pts = BinaryHeap::new();
        for point in points {
            let dist = (point[0].pow(2) + point[1].pow(2));
            pts.push(Reverse((dist, point[0], point[1])));
        }

        let mut res: Vec<Vec<i32>> = vec![];
        for i in 0..k {
            match pts.pop() {
                Some(Reverse((dist, x, y))) => res.push(vec![x,y]),
                None => {}
            }
        }
        res
    }
}