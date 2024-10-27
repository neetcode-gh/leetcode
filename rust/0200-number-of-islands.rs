impl Solution {
    pub fn num_islands(grid: Vec<Vec<char>>) -> i32 {
        fn dfs(grid: &mut Vec<Vec<char>>, x: i32, y: i32) {
            if x < 0
                || y < 0
                || x >= grid.len() as i32
                || y >= grid[0].len() as i32
                || grid[x as usize][y as usize] == '0'
            {
                return;
            }

            grid[x as usize][y as usize] = '0';

            let directions: [(i32, i32); 4] = [(0, 1), (1, 0), (0, -1), (-1, 0)];

            for (add_x, add_y) in directions {
                dfs(grid, x + add_x, y + add_y);
            }
        }

        let mut count = 0;
        let mut new_grid = grid.clone();

        for x in 0..grid.len() {
            for y in 0..grid[0].len() {
                if new_grid[x][y] == '1' {
                    count += 1;
                    dfs(&mut new_grid, x as i32, y as i32);
                }
            }
        }

        count
    }
}
