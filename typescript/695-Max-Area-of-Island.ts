function maxAreaOfIsland(grid: number[][]): number {
    let directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    let rows = grid.length;
    let columns = grid[0].length;
    const dfs = (grid, r, c) => {
        let cells = 0;
        if (r < 0 || r >= rows || c < 0 || c >= columns || !grid[r][c])
            return 0;
        grid[r][c] = 0;
        directions.forEach(([dR, dC]) => (cells += dfs(grid, r + dR, c + dC)));

        return cells + 1;
    };

    let max = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            max = Math.max(max, dfs(grid, i, j));
        }
    }

    return max;
}
