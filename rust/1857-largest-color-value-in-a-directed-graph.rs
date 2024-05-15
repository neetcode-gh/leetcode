use std::collections::VecDeque;

impl Solution {
    pub fn largest_path_value(colors: String, edges: Vec<Vec<i32>>) -> i32 {
        let n = colors.len();
        let mut graph = vec![vec![]; n];
        let mut indegree = vec![0; n];
        
        for edge in edges {
            let u = edge[0] as usize;
            let v = edge[1] as usize;
            graph[u].push(v);
            indegree[v] += 1;
        }
        
        let mut queue = VecDeque::new();
        for i in 0..n {
            if indegree[i] == 0 {
                queue.push_back(i);
            }
        }
        
        let mut color_count = vec![vec![0; 26]; n];
        let mut visited = 0;
        let colors = colors.as_bytes();
        let mut max_color_value = 0;
        
        while let Some(node) = queue.pop_front() {
            visited += 1;
            let color_index = (colors[node] - b'a') as usize;
            color_count[node][color_index] += 1;
            max_color_value = max_color_value.max(color_count[node][color_index]);
            
            for &neigh in &graph[node] {
                for i in 0..26 {
                    color_count[neigh][i] = color_count[neigh][i].max(color_count[node][i]);
                }
                indegree[neigh] -= 1;
                if indegree[neigh] == 0 {
                    queue.push_back(neigh);
                }
            }
        }
        
        if visited != n as i32 {
            return -1;
        }
        
        max_color_value
    }
}
