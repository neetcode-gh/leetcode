use std::collections::HashMap;

impl Solution {
    pub fn min_time(n: i32, edges: Vec<Vec<i32>>, has_apple: Vec<bool>) -> i32 {
        let mut adj = HashMap::new();

        for edge in edges {
            let (parent, child) = (edge[0], edge[1]);
            adj.entry(parent).or_insert(vec![]).push(child);
            adj.entry(child).or_insert(vec![]).push(parent);
        }

        fn dfs(
            current: i32,
            parent: i32,
            adj: &HashMap<i32, Vec<i32>>,
            has_apple: &Vec<bool>,
        ) -> i32 {
            let mut time = 0;

            if let Some(children) = adj.get(&current) {
                for child in children {
                    if *child == parent {
                        continue;
                    }
                    let child_time = dfs(*child, current, &adj, &has_apple);

                    if child_time.is_positive() || has_apple[*child as usize] {
                        time += 2 + child_time;
                    }
                }
            }

            time
        }

        dfs(0, -1, &adj, &has_apple)
    }
}