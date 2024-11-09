// https://leetcode.com/problems/swim-in-rising-water/submissions/1011351676/
// Faster than 100% and less memory than 100%

use std::collections::BinaryHeap;
#[derive(Eq, PartialEq)]
struct State {
    t: i32,
    i: usize,
    j: usize,
}

impl Ord for State {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        other.t.cmp(&self.t)
    }
}

impl PartialOrd for State {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}


impl Solution {
    pub fn swim_in_water(grid: Vec<Vec<i32>>) -> i32 {
        // Problem Description: You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).
        // The rain starts to fall. At time t, the depth of the water everywhere is t. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.
        // Return the least time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square (0, 0).
        let n = grid.len();
        let mut visited = vec![vec![false; n]; n];
        let mut heap = BinaryHeap::new();
        heap.push(State {
            t: grid[0][0],
            i: 0,
            j: 0,
        });
        let mut min_t = 0;
        // want to find the min time that can reach the bottom right square
        while let Some(State { t, i, j }) = heap.pop() {
            min_t = min_t.max(t);
            if i == n - 1 && j == n - 1 {
                return min_t;
            }
            for (di, dj) in [(1, 0), (0, 1), (-1, 0), (0, -1)].iter() {
                let ni = i as i32 + di;
                let nj = j as i32 + dj;
                if ni >= 0
                    && ni < n as i32
                    && nj >= 0
                    && nj < n as i32
                    && !visited[ni as usize][nj as usize]
                {
                    heap.push(State {
                        t: grid[ni as usize][nj as usize],
                        i: ni as usize,
                        j: nj as usize,
                    });
                    visited[ni as usize][nj as usize] = true;
                }
            }
        }
        min_t
    }
}
