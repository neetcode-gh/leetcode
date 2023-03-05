use std::collections::{HashMap, VecDeque};
impl Solution {
    // Time O(n) - Space O(n)
    pub fn min_jumps(arr: Vec<i32>) -> i32 {
        let n = arr.len();
        // Handle a base case.
        if n < 2 {
            return 0;
        }
        // Use a dictionary of vertices indexed by value.
        let mut d = HashMap::<i32, Vec<usize>>::new();
        arr.iter()
            .enumerate()
            .for_each(|(i, num)| d.entry(*num).or_default().push(i));
        // An array of flags of elements that we have processed already.
        let mut seen = vec![false; n];
        seen[0] = true;
        // Use BFS to travel through the graph.
        let mut steps = 0;
        let mut queue = VecDeque::<usize>::from(vec![0]);
        loop {
            steps += 1;
            // Process an entire level.
            for _ in 0..queue.len() {
                let cur = queue.pop_front().unwrap();
                for nei in Self.get_unqueued_neighbors(cur, &n, &mut seen, &mut d, &arr) {
                    if nei == n - 1 {
                        return steps;
                    }
                    queue.push_back(nei);
                }
            }
        }
    }

    // An internal function that computes the unvisited neighbors of a given node.
    fn get_unqueued_neighbors(
        self,
        i: usize,
        n: &usize,
        seen: &mut Vec<bool>,
        d: &mut HashMap<i32, Vec<usize>>,
        arr: &Vec<i32>,
    ) -> Vec<usize> {
        let mut adj = vec![];
        // The element before is reachable.
        if i > 0 && !seen[i - 1] {
            seen[i - 1] = true;
            adj.push(i - 1);
        }
        // The element after is also reachable.
        if i < n - 1 && !seen[i + 1] {
            seen[i + 1] = true;
            adj.push(i + 1);
        }
        // And all nodes with the same value are also reachable.
        if d.contains_key(&arr[i]) {
            for node in d.entry(arr[i]).or_default() {
                let node = *node;
                if node != i {
                    adj.push(node);
                    seen[node] = true;
                }
            }
            d.remove(&arr[i]);
        }
        adj
    }
}
