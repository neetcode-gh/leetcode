impl Solution {
    pub fn max_area_of_island(grid: Vec<Vec<i32>>) -> i32 {
        fn dfs(grid: &mut Vec<Vec<i32>>, x: i32, y: i32) -> i32 {
            if x < 0
                || y < 0
                || x >= grid.len() as i32
                || y >= grid[0].len() as i32
                || grid[x as usize][y as usize] == 0
            {
                return 0;
            }

            grid[x as usize][y as usize] = 0;

            let mut count = 1;
            let directions: [(i32, i32); 4] = [(0, 1), (1, 0), (0, -1), (-1, 0)];

            for (add_x, add_y) in directions {
                count += dfs(grid, x + add_x, y + add_y);
            }

            count
        }

        let mut max_area = 0;
        let mut new_grid = grid.clone();

        for x in 0..grid.len() {
            for y in 0..grid[0].len() {
                if new_grid[x][y] == 1 {
                    max_area = max_area.max(dfs(&mut new_grid, x as i32, y as i32));
                }
            }
        }

        max_area
    }
}
