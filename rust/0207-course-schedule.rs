impl Solution {
    pub fn can_finish(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> bool {
        let mut graph = vec![vec![]; num_courses as usize];
        let mut visited = vec![0; num_courses as usize];

        for edge in prerequisites {
            graph[edge[0] as usize].push(edge[1] as usize);
        }

        for i in 0..num_courses as usize {
            if !Self::dfs(i, &graph, &mut visited) {
                return false;
            }
        }

        true
    }

    fn dfs(i: usize, graph: &Vec<Vec<usize>>, visited: &mut Vec<i32>) -> bool {
        if visited[i] == 1 {
            return false;
        }

        if visited[i] == -1 {
            return true;
        }

        visited[i] = 1;

        for j in graph[i].iter() {
            if !Self::dfs(*j, graph, visited) {
                return false;
            }
        }

        visited[i] = -1;

        true
    }
}
