//BFS way to solve this
const bfs = (grid, r, c) => {
    const [ROWS, COLS] = [grid.length, grid[0].length];

    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    let queue = [[r, c]];

    //marks as visited
    grid[r][c] = '0';

    while (queue.length > 0) {
        //dequeues the first element(current)
        let [cr, cc] = queue.shift();

        directions.forEach(([dr, dc]) => {
            let [nr, nc] = [cr + dr, cc + dc];
            if (
                !(
                    nr < 0 ||
                    nc < 0 ||
                    nr >= ROWS ||
                    nc >= COLS ||
                    grid[nr][nc] === '0'
                )
            ) {
                queue.push([nr, nc]);
                grid[nr][nc] = '0';
            }
        });
    }
};

function numIslands(grid: string[][]): number {
    const [ROWS, COLS] = [grid.length, grid[0].length];

    let islands = 0;

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (grid[i][j] === '1') {
                bfs(grid, i, j);
                islands++;
            }
        }
    }

    return islands;
}
