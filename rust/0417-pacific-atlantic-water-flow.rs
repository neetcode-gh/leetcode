use std::collections::HashSet;

impl Solution {
    pub fn pacific_atlantic(heights: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        fn dfs(
            heights: &Vec<Vec<i32>>,
            x: i32,
            y: i32,
            visit: &mut HashSet<(i32, i32)>,
            prev: i32,
        ) {
            if x < 0
                || y < 0
                || x == heights.len() as i32
                || y == heights[0].len() as i32
                || heights[x as usize][y as usize] < prev
                || visit.contains(&(x, y))
            {
                return;
            }
            visit.insert((x, y));
            for (add_x, add_y) in [(0, 1), (1, 0), (0, -1), (-1, 0)] {
                dfs(
                    heights,
                    x + add_x,
                    y + add_y,
                    visit,
                    heights[x as usize][y as usize],
                );
            }
        }

        let (mut pac, mut atl) = (HashSet::new(), HashSet::new());
        let (n_rows, n_cols) = (heights.len(), heights[0].len());

        for x in 0..n_rows {
            dfs(&heights, x as i32, 0, &mut pac, heights[x][0]);
            dfs(
                &heights,
                x as i32,
                n_cols as i32 - 1,
                &mut atl,
                heights[x][n_cols - 1],
            );
        }

        for y in 0..n_cols {
            dfs(&heights, 0, y as i32, &mut pac, heights[0][y]);
            dfs(
                &heights,
                n_rows as i32 - 1,
                y as i32,
                &mut atl,
                heights[n_rows - 1][y],
            );
        }

        (0..n_rows)
            .flat_map(|x| (0..n_cols).map(move |y| (x, y)))
            .filter(|(x, y)| {
                pac.contains(&(*x as i32, *y as i32)) && atl.contains(&(*x as i32, *y as i32))
            })
            .map(|(x, y)| vec![x as i32, y as i32])
            .collect()
    }
}
