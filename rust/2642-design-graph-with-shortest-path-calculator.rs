#![allow(dead_code)]

/*
 * @lc app=leetcode id=2642 lang=rust
 *
 * [2642] Design Graph With Shortest Path Calculator
 */

// @lc code=start

use std::{collections::BinaryHeap, fmt::Display};

struct GraphNode {
    id: usize,
    cost: usize,
}

impl From<&Vec<i32>> for GraphNode {
    fn from(edge: &Vec<i32>) -> Self {
        Self {
            id: check_positive(edge[1]).unwrap(),
            cost: check_positive(edge[2]).unwrap()
        }
    }
}

#[derive(Copy, Clone, Eq, PartialEq)]
struct State {
    cost: usize,
    position: usize,
}

impl Ord for State {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        other
            .cost
            .cmp(&self.cost)
            .then_with(|| self.position.cmp(&other.position))
    }
}
impl PartialOrd for State {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

struct Graph {
    graph: Vec<Vec<GraphNode>>,
}
#[derive(Debug, Clone)]
struct NegativeError;

impl Display for NegativeError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "input value was negative")
    }
}

fn check_positive(a: i32) -> Result<usize, NegativeError> {
    if a < 0 {
        return Err(NegativeError)
    } else {
        Ok(a as usize)
    }
}

impl Graph {
    fn new(n: i32, edges: Vec<Vec<i32>>) -> Self {
        let n = check_positive(n).unwrap(); 
        // Vec with n items, graph[node_int] = [Edge neighbors {node: other_int, cost: #}]
        let mut graph: Vec<Vec<GraphNode>> = Vec::with_capacity(n as usize);
        for _ in 0..n {
            graph.push(Vec::new());
        }
        for edge in edges.iter() {
            match edge.len() {
                3 => {
                    graph[edge[0] as usize].push(GraphNode::from(edge));
                }
                _ => panic!(
                    "Invalid input format, edge must have format [to, from, cost] {:?}",
                    edge
                ),
            }
        }
        Self { graph }
    }

    fn add_edge(&mut self, edge: Vec<i32>) {
        // Create new Edge, addd to graph[edge[0]]
        match edge.len() {
            3 => {
                let node = GraphNode::from(&edge);
                self.graph[edge[0] as usize].push(node);
            }
            _ => panic!(
                "Invalid input format, edge must have format [to, from, cost] {:?}",
                edge
            ),
        }
    }

    fn shortest_path(&mut self, node1: i32, node2: i32) -> i32 {
        let start = check_positive(node1).unwrap();
        let end = check_positive(node2).unwrap();
        let mut dist: Vec<usize> = vec![usize::MAX; self.graph.len()];
        let mut heap = BinaryHeap::new();

        dist[start] = 0;
        heap.push(State {
            cost: 0,
            position: start
        });
        while let Some(State { cost, position }) = heap.pop() {
            if position == end {
                return cost as i32;
            }
            if cost > dist[position] {
                continue;
            }
            for edge in &self.graph[position] {
                let next = State {cost: cost + edge.cost, position: edge.id as usize};
                if next.cost < dist[next.position] {
                    heap.push(next);
                    dist[next.position] = next.cost;
                }
            }
        }
        -1
    }
}

// @lc code=end
fn main() {
    unimplemented!();
}
