/**
 * https://leetcode.com/problems/rotting-oranges/
 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    const { queue, orangeCount } = searchGrid(grid);  /* Time O(ROWS * COLS) */
    const { rottenCount, minutes } = bfs(grid, queue);

    const isEqual = orangeCount === rottenCount;
    return isEqual
        ? minutes
        : -1;
};

const searchGrid = (grid, orangeCount = 0, queue = new Queue([])) => {
    const [ rows, cols ] = [ grid.length, grid[0].length ];

    for (let row = 0; row < rows; row++){/* Time O(ROWS) */
        for (let col = 0; col < cols; col++) {/* Time O(COLS) */
            const isEmpty = grid[row][col] === 0;
            if (!isEmpty) orangeCount++;

            const isRotten = grid[row][col] === 2;
            if (isRotten) queue.enqueue([ row, col ]);/* Space O(ROWS * COLS) */
        }
    }

    return { queue, orangeCount }
}

const bfs = (grid, queue, rottenCount = 0, minutes = 0) => {
    while (!queue.isEmpty()) {
        rottenCount += queue.size();

        for (let i = (queue.size() - 1); 0 <= i; i--) {/* Time O(WIDTH) */
            expireFresh(grid, queue);
        }

        if (queue.size()) minutes++;
    }

    return { rottenCount, minutes };
}

var expireFresh = (grid, queue) => {
    const [ rows, cols ] = [ grid.length, grid[0].length ];
    const [ row, col ] = queue.dequeue();

    for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {
        const isFresh = grid[_row][_col] === 1;
        if (!isFresh) continue;

        grid[_row][_col] = 2;
        queue.enqueue([ _row, _col ]);/* Space O(ROWS * COLS) */
    }
}

var getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ],[ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]
    .map(([ _row, _col ]) => [ (row + _row), (col + _col) ])
    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols));

/**
 * https://leetcode.com/problems/rotting-oranges/
 * Time O((ROWS * COLS)^2) | Space O(1)
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid, minutes = 2) {
    while (expireFresh(grid, minutes)) minutes++;/* Time O((ROWS * COLS)^2) */

    return !hasFresh(grid)                       /* Time O(ROWS * COLS) */
        ? (minutes - 2)
        : -1;
}

var expireFresh = (grid, minutes, toBeContinued = false) => {
    const [ rows, cols ] = [ grid.length, grid[0].length ];

    for (let row = 0; row < rows; row++) {/* Time O(ROWS) */
        for (let col = 0; col < cols; col++) {/* Time O(COLS) */
            const isEqual = grid[row][col] === minutes;
            if (!isEqual) continue;

            for (const [ _row, _col ] of getNeighbors(row, rows, col, cols)) {
                const isFresh = grid[_row][_col] === 1;
                if (!isFresh) continue;

                grid[_row][_col] = (minutes + 1);
                toBeContinued = true;
            }
        }
    }

    return toBeContinued;
}

var getNeighbors = (row, rows, col, cols) => [ [ 0, 1 ],[ 0, -1 ], [ 1, 0 ], [ -1, 0 ] ]
    .map(([ _row, _col ]) => [ (row + _row), (col + _col) ])
    .filter(([ _row, _col ]) => (0 <= _row) && (_row < rows) && (0 <= _col) && (_col < cols));

const hasFresh = (grid) => {
    for (const row of grid) {/* Time O(ROWS) */
        for (const cell of row) {/* Time O(COLS) */
            const isFresh = cell === 1;
            if (isFresh) return true;
        }
    }

    return false;
}