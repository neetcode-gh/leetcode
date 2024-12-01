use std::{cmp::Ordering, collections::HashMap};

struct UnionFind {
    parent: Vec<usize>,
    rank: Vec<i32>,
}

impl UnionFind {
    fn new(n: usize) -> Self {
        UnionFind {
            parent: (0..n).collect(),
            rank: vec![0; n],
        }
    }

    fn find(&mut self, mut i: usize) -> usize {
        while i != self.parent[i] {
            self.parent[i] = self.parent[self.parent[i]];
            i = self.parent[i];
        }
        i
    }

    fn union(&mut self, a: usize, b: usize) -> bool {
        let a_root = self.find(a);
        let b_root = self.find(b);

        if a_root == b_root {
            return false;
        }
        match self.rank[a_root].cmp(&self.rank[b_root]) {
            Ordering::Less => {
                self.parent[a_root] = b_root;
                self.rank[b_root] += self.rank[a_root];
            }
            _ => {
                self.parent[b_root] = a_root;
                self.rank[a_root] = self.rank[b_root];
            }
        }
        true
    }
}

impl Solution {
    pub fn number_of_good_paths(vals: Vec<i32>, edges: Vec<Vec<i32>>) -> i32 {
        let adj = Self::create_adj_list(&edges);
        let val_to_index = Self::create_val_to_index(&vals);

        let mut res = 0;
        let mut uf = UnionFind::new(vals.len());

        let mut keys: Vec<i32> = val_to_index.keys().cloned().collect();
        keys.sort();

        for val in keys {
            for i in val_to_index.get(&val).unwrap_or(&vec![]) {
                for nei in adj.get(&(*i as i32)).unwrap_or(&vec![]) {
                    if vals[*nei as usize] <= vals[*i] {
                        uf.union(*nei as usize, *i);
                    }
                }
            }
            let mut count = HashMap::new();
            for i in val_to_index.get(&val).unwrap() {
                *count.entry(uf.find(*i)).or_insert(0) += 1;
                res += count.get(&uf.find(*i)).unwrap();
            }
        }
        
        res
    }

    pub fn create_adj_list(edges: &Vec<Vec<i32>>) -> HashMap<i32, Vec<i32>> {
        let mut adj = HashMap::new();

        for edge in edges {
            let a = edge[0];
            let b = edge[1];

            adj.entry(a).or_insert(vec![]).push(b);
            adj.entry(b).or_insert(vec![]).push(a);
        }

        adj
    }

    pub fn create_val_to_index(vals: &Vec<i32>) -> HashMap<i32, Vec<usize>> {
        let mut val_to_index = HashMap::new();

        for (i, val) in vals.iter().enumerate() {
            val_to_index.entry(*val).or_insert(vec![]).push(i);
        }

        val_to_index
    }
}