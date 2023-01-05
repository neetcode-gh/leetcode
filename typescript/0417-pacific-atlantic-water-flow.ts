/**
 * Breath First Search implementation
 * @param matrix 
 * @param queue 
 * @param visited 
 */
const bfs = (matrix: number[][], queue: number[][], visited: boolean[][]): void => {
    let m = matrix.length, n = matrix[0].length;
    let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    while (queue.length > 0) {
        const [qCordx, qCordy] = queue.shift()!;
        for (let dir of directions) {
            const x = qCordx + dir[0], y = qCordy + dir[1];
            if (!(
                x < 0 ||
                y < 0 ||
                x >= m ||
                y >= n ||
                visited[x][y] ||
                matrix[x][y] < matrix[qCordx][qCordy])
            ) {
                visited[x][y] = true;
                queue.push([x, y]);
            }

        }
    }
}

/**
 * Creates a Matrix NXM with false values
 */
const createMatrix = (n: number, m: number): boolean[][] =>
    Array.from({ length: n }, () => Array.from({ length: m }, () => false));


function pacificAtlantic(heights: number[][]): number[][] {
    const ROWS = heights.length, COLS = heights[0].length;
    let pacific: boolean[][] = createMatrix(ROWS, COLS);
    let atlantic: boolean[][] = createMatrix(ROWS, COLS);
    let pacQueue: number[][] = [];
    let atlQueue: number[][] = [];
    let results: number[][] = [];

    // Set as 'true' Pacific edges
    for (let i = 0; i < ROWS; i++) {
        pacific[i][0] = true;
        atlantic[i][COLS - 1] = true;
        atlQueue.push([i, COLS - 1]);
        pacQueue.push([i, 0]);
    }
    // Set as 'true' atlantic edges
    for (let j = 0; j < COLS; j++) {
        pacific[0][j] = true;
        atlantic[ROWS - 1][j] = true;
        atlQueue.push([ROWS - 1, j]);
        pacQueue.push([0, j]);
    }

    // BFS
    bfs(heights, pacQueue, pacific);
    bfs(heights, atlQueue, atlantic);

    // Verify intersections
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (pacific[i][j] && atlantic[i][j]) results.push([i, j]);
        }
    }

    return results;
};
