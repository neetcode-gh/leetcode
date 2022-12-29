use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn get_order(tasks: Vec<Vec<i32>>) -> Vec<i32> {
        let mut tasks = tasks;

        for (i, t) in tasks.iter_mut().enumerate() {
            t.push(i as i32);
        }
        tasks.sort_by(|a, b| a[0].cmp(&b[0]));

        let mut res = vec![];
        let mut min_heap = BinaryHeap::new();
        let (mut i, mut time) = (0, tasks[0][0]);

        while !min_heap.is_empty() || i < tasks.len() {
            while i < tasks.len() && time >= tasks[i][0] {
                min_heap.push(Reverse(vec![tasks[i][1], tasks[i][2]]));
                i += 1;
            }

            if min_heap.is_empty() {
                time = tasks[i][0];
            } else {
                let pair = min_heap.pop().unwrap();
                let process_time = pair.0[0];
                let index = pair.0[1];
                time += process_time;
                res.push(index);
            }
        }
        res
    }
}