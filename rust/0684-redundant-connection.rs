use std::cmp::Ordering;

struct UnionFind {
    parent: Vec<usize>,
    rank: Vec<i32>,
}

impl UnionFind {
    fn new(n: usize) -> Self {
        UnionFind {
            parent: (0..(n + 1)).collect(),
            rank: vec![1; n + 1],
        }
    }

    fn find(&mut self, n: usize) -> usize {
        let mut p = self.parent[n];

        while p != self.parent[p] {
            self.parent[p] = self.parent[self.parent[p]];
            p = self.parent[p];
        }

        p
    }

    fn union(&mut self, n1: usize, n2: usize) -> bool {
        let p1 = self.find(n1);
        let p2 = self.find(n2);

        if p1 == p2 {
            return false;
        }
        match self.rank[p1].cmp(&self.rank[p2]) {
            Ordering::Greater => {
                self.parent[p2] = p1;
                self.rank[p1] += self.rank[p2];
            }
            _ => {
                self.parent[p1] = p2;
                self.rank[p2] = self.rank[p1];
            }
        }
        true
    }
}

impl Solution {
    pub fn find_redundant_connection(edges: Vec<Vec<i32>>) -> Vec<i32> {
        let mut union_find = UnionFind::new(edges.len() + 1);

        for edge in edges {
            let (n1, n2) = (edge[0] as usize, edge[1] as usize);
            if !union_find.union(n1, n2) {
                return vec![n1 as i32, n2 as i32];
            }
        }
        unreachable!()
    }
}