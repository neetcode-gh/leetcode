impl Solution {
    // Time O(n*log(n)) - Space O(n)
    pub fn find_maximized_capital(k: i32, w: i32, profits: Vec<i32>, capital: Vec<i32>) -> i32 {
        use std::collections::BinaryHeap;
        let mut sorted_jobs: Vec<(i32, i32)> = (0..profits.len())
            .map(|i| (capital[i], profits[i]))
            .collect();
        sorted_jobs.sort();
        sorted_jobs.reverse();
        let mut heap = BinaryHeap::<i32>::new();
        // The current capital.
        let mut cap = w;
        for _ in 0..k {
            while sorted_jobs.len() > 0 && sorted_jobs[sorted_jobs.len() - 1].0 <= cap {
                match sorted_jobs.pop() {
                    Some((_, p)) => heap.push(p),
                    None => unreachable!(),
                }
            }
            match heap.pop() {
                Some(v) => cap += v,
                None => break,
            }
        }
        cap
    }
}
